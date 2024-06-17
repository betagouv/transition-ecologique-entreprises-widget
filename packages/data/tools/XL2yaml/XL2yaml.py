#!./.venv/bin/python

import os
import random
import re
import sys
from pathlib import Path
from typing import Any, Optional
import validators
import requests

import pylightxl
import yaml

INPUT_XL_FILE = "./dispositifs.xlsx"
WORKSHEET = "DataProd"
SKIP_XL_LINES = 5
OUTPUT_DIR = "../../programs"


CIBLE = "entreprise . est ciblée"
ELIGIBLE = "entreprise . est éligible"
OBJECTIF = "entreprise . a un objectif ciblé"
SECTEUR = "entreprise . est dans un secteur d'activité ciblé"
ZONE_GEO = "entreprise . est dans une zone géographique éligible"
EFFECTIF = "entreprise . a un effectif éligible"
PARCOURS_OBJ_PRECIS = "questionnaire . parcours = objectif précis"
PROPRIO = "entreprise . est propriétaire de ses locaux"

ELIGIBILITY_SIZE = "taille de l'entreprise"
ELIGIBILITY_GEOGRAPHY = "secteur géographique"
ELIGIBILITY_SECTOR = "secteur d'activité"
ELIGIBILITY_NYEARS = "nombre d'années d'activité"
ELIGIBILITY_SPECIFIC = "autres critères d'éligibilité"

ALL = "toutes ces conditions"
ANY = "une de ces conditions"


def remove_namespace(s):
    return "".join(s.split(" . ")[1:])


def assembleProgramYAML(rawData, colNumbersByName, id):
    def get(name):
        value = rawData[colNumbersByName[name]]
        return curate(value)

    def get_maybe(name):
        if name not in colNumbersByName:
            return False
        value = rawData[colNumbersByName[name]]
        return curate(value)

    try:
        existingProgram = readFromYaml(Path(OUTPUT_DIR, f"{id}.yaml"))
    except:  # noqa
        existingProgram = {}

    prog = {}

    FORCE_ALL = True

    # Only sets the key if key does not exist.
    # if force = True, then replaces the key even if it exists
    def set(key, value, overwrite=FORCE_ALL):
        if overwrite or key not in existingProgram:
            prog[key] = value
        else:
            prog[key] = existingProgram[key]

    set("titre", get("Titre"))
    set("promesse", get("Promesse"))
    set("description", get("Description courte"))

    if get("Description longue"):
        set("description longue", get("Description longue"))

    if valid(get("DISPOSITIF_DATE_DEBUT")):
        set("début de validité", get("DISPOSITIF_DATE_DEBUT"))
    if valid(get("DISPOSITIF_DATE_FIN")):
        set("fin de validité", get("DISPOSITIF_DATE_FIN"))

    set("illustration", randomIllustration(), overwrite=False)
    set("opérateur de contact", get("Opérateur de contact"))

    autresOp = csv_to_list(get("Autres opérateurs"))
    if len(autresOp) >= 1:
        set("autres opérateurs", autresOp)

    set("url", get("🔗 URL externe"))
    set("nature de l'aide", get("💸 Nature de l'aide").lower())
    nat = prog["nature de l'aide"]
    if nat == "étude":
        if get("💰 Montant de l'aide") and get("💰 Montant de l'aide") != "-":
            set("montant du financement", get("💰 Montant de l'aide"))
        if get("💰 Coût reste à charge") and get("💰 Coût reste à charge") != "-":
            set("coût de l'accompagnement", get("💰 Coût reste à charge"))
        if (
            get("⏱Prestation (durée + étalement)")
            and get("⏱Prestation (durée + étalement)") != "-"
        ):
            set("durée de l'accompagnement", get("⏱Prestation (durée + étalement)"))

    if nat == "financement":
        set("montant du financement", get("💰 Montant de l'aide"))
    if nat == "étude":
        set("coût de l'accompagnement", get("💰 Coût reste à charge"))
        set("durée de l'accompagnement", get("⏱Prestation (durée + étalement)"))
    if nat == "prêt":
        set("durée du prêt", get("Etalement"))
        set(
            "montant du prêt",
            f'De {thousandSep(get("MontantMin aide"))} € à {thousandSep(get("MontantMax aide"))} €',
        )
    if nat == "avantage fiscal":
        set("montant de l'avantage fiscal", get("💰 Montant de l'aide"))

    if get("Dispositif activable en autonomie") == 1:
        set("activable en autonomie", "oui")

    objectives = createYamlObjectives(get_maybe)
    set("objectifs", objectives)

    pc = {}
    cible = []  # Accumulateur des règles qui font parti du ciblage.
    eligibilite = []  # Accumulateur des règles qui font parti de l'éligibilité.

    # Conditions d'éligibilité
    eligibility_conditions = {
        ELIGIBILITY_SIZE: [],
        ELIGIBILITY_GEOGRAPHY: [],
        ELIGIBILITY_SECTOR: [],
        ELIGIBILITY_NYEARS: [],
    }

    eligibility_conditions[ELIGIBILITY_SIZE].append(eligibility_size(get))
    eligibility_conditions[ELIGIBILITY_SIZE].append(eligibility_microentreprise(get))

    for eg in eligibility_geography(get):
        eligibility_conditions[ELIGIBILITY_GEOGRAPHY].append(eg)

    eligibility_conditions[ELIGIBILITY_SECTOR].append(eligibility_sector(get))
    if eligibility_naf(get):
        eligibility_conditions[ELIGIBILITY_SECTOR].append(eligibility_naf(get))

    eligibility_conditions[ELIGIBILITY_NYEARS].append(eligibility_nyears(get))

    for es in eligibility_specific(get):
        if ELIGIBILITY_SPECIFIC not in eligibility_conditions:
            eligibility_conditions[ELIGIBILITY_SPECIFIC] = []
        eligibility_conditions[ELIGIBILITY_SPECIFIC].append(es)

    set("conditions d'éligibilité", eligibility_conditions)

    # Publicodes constraints
    effective_constraint = pc_effectifConstraint(get("minEff"), get("maxEff"))
    if effective_constraint:
        pc[EFFECTIF] = effective_constraint
        eligibilite.append(remove_namespace(EFFECTIF))

    sc = pc_secteurActivitéConstraint(get)
    if sc:
        pc[SECTEUR] = sc
        cible.append(remove_namespace(SECTEUR))

    op = pc_objPrioritaire(get)
    if op:
        pc[OBJECTIF] = op
        cible.append(remove_namespace(OBJECTIF))

    reg = pc_regions(get)
    if reg:
        pc[ZONE_GEO] = reg
        eligibilite.append(ZONE_GEO)

    p360 = pc_questionnaireRoute(get)
    if p360:
        cible.append(PARCOURS_OBJ_PRECIS)

    own = pc_building_owner(get)
    if own:
        cible.append(PROPRIO)

    applicability = pc_eligibility_applicability(
        get("DISPOSITIF_DATE_DEBUT"), get("DISPOSITIF_DATE_FIN")
    )

    if len(eligibilite) != 0:
        eligibilite = {
            **applicability,
            ALL: eligibilite,
        }
    elif applicability:
        eligibilite = {
            **applicability,
            "valeur": "oui",
        }

    publicodes_obj = {}

    if eligibilite:
        cible = [remove_namespace(ELIGIBLE)] + cible

    publicodes_obj[CIBLE] = {ALL: cible}

    if eligibilite:
        publicodes_obj[ELIGIBLE] = eligibilite

    publicodes_obj |= pc

    set("publicodes", publicodes_obj, overwrite=False)

    return convertToYaml(prog)


def isValidLink(link, i, j):
    if link == "":
        return False

    if not validators.url(link):
        print(f"lien {i}{j} non valide")
        return False

    try:
        response = requests.head(link)
        if response.status_code == 200:
            return True
        else:
            print(f"Warning: lien {i}{j}, status code :", response.status_code)
        return True
    except requests.exceptions.RequestException:
        print(
            f"Lien {i}{j}, erreur durant la requète, Lien non ajouté",
            requests.exceptions.RequestException,
        )
        return False


def createYamlObjectives(get):
    objectiveList = []
    possibleObjective = ["1er", "2ème", "3ème", "4ème", "5ème", "6ème"]
    i = 0
    while i < 6 and get(f"🎯 {possibleObjective[i]} étape"):
        if get(f"🎯 {possibleObjective[i]} étape") == "-":
            i += 1
            continue
        currentObjective = {}
        currentObjective["description"] = get(f"🎯 {possibleObjective[i]} étape")
        linkList = []
        j = 1
        while get(f"étape {i+1}/ lien{j}"):
            link = get(f"étape {i+1}/ lien{j}")
            text = get(f"étape {i+1}/ nom du lien{j}")
            j += 1
            if not link or not text or not isValidLink(link, i, j):
                continue
            linkList.append({"lien": link, "texte": text})
        if linkList:
            currentObjective["liens"] = linkList
        objectiveList.append(currentObjective)
        i += 1
    return objectiveList


def remove_special_chars(text: str) -> str:
    t = re.sub(r'("[^"]+")|[-\']', r"\1 ", text)
    t = re.sub(r'("[^"]+")|[^\w ]', r"\1 ", t)

    return t


def remove_accents(text: str) -> str:
    """Remove accents removes accents on voyels.

    It does not deal with æ, ñ etc. Consult code for exact substitutions.
    """
    t = re.sub(r"[èéêë]", "e", text)
    t = re.sub(r"[àáâãäå]", "a", t)
    t = re.sub(r"[ìíîï]", "i", t)
    t = re.sub(r"[òóôõö]", "o", t)
    t = re.sub(r"[ùúûü]", "u", t)
    t = re.sub(r"[ÈÉÊË]", "E", t)
    t = re.sub(r"[ÀÁÂÃÄÅ]", "A", t)
    t = re.sub(r"[ÌÍÎÏ]", "I", t)
    t = re.sub(r"[ÒÓÔÕÖ]", "O", t)
    t = re.sub(r"[ÙÚÛÜ]", "U", t)
    t = re.sub(r"ç", "c", t)
    return t


def forgeID(name):
    name = name.lower()
    name = remove_special_chars(name)
    name = remove_accents(name)
    name = re.sub(r"[ _'&]", "-", name)
    name = re.sub(r"-+", "-", name)
    name = re.sub(r"-$", "", name)
    name = re.sub(r"\"", "", name)
    return name


def readXL(path, worksheet):
    db = pylightxl.readxl(fn=path, ws=worksheet)
    return db.ws(worksheet)


def identifyColNumbers(header: list[Any]):
    return {h: i for h, i in zip(header, range(len(header)))}


def randomIllustration():
    illustrations = [
        "images/TEE_energie_verte.png",
        "images/TEE_ampoule.png",
        "images/TEE_eolienne.png",
    ]
    return illustrations[random.randint(0, 2)]


WRONG_DATE_PATTERN = re.compile(r"^[0-9]{4}/[0-9]{2}/[0-9]{2}$")


def curate(value):
    curated = value
    if isinstance(value, str):
        curated = curated.strip()

    if isinstance(curated, str) and WRONG_DATE_PATTERN.match(curated):
        curated = curated[8:10] + "/" + curated[5:7] + "/" + curated[0:4]

    return curated


def valid(value):
    if curate(value) == "-" or curate(value) == "*" or curate(value) == "":
        return False
    return True


def csv_to_list(input: str) -> list[str]:
    return [curate(s) for s in re.split(r",|\|", input) if valid(s)]


def makeObj(objs: list[str]):
    def keepObj(obj):
        return curate(obj) != "" and curate(obj) != "-"

    return [obj for obj in objs if keepObj(obj)]


def eligibility_size(get) -> str:
    col_eligibilite_taille = get("👫👫\nEligibilité Taille")
    col_min_eff = get("minEff")
    col_max_eff = get("maxEff")
    if valid(col_eligibilite_taille):
        return col_eligibilite_taille
    elif valid(col_min_eff) and valid(col_max_eff):
        return f"Effectif compris entre {col_min_eff} et {col_max_eff} employés"
    elif valid(col_min_eff):
        return f"Effectif supérieur à {col_min_eff} employés"
    elif valid(col_max_eff):
        return f"Effectif inférieur à {col_max_eff} employés"
    return "Toutes tailles"


def eligibility_microentreprise(get) -> str:
    me = get("microEntre")
    if valid(me):
        if me.lower() == "oui":
            return "Éligible aux micro-entreprises"
        elif me.lower() == "non":
            return "Non éligible aux micro-entreprises"
        else:
            raise Exception("Valeur non interprétable (colonne microEntre)")
    return "Éligible aux micro-entreprises"


def eligibility_sector(get) -> str:
    es = get("👨‍🍳Eligibilité Sectorielle")
    if valid(es):
        return es
    raise Exception("Condition d'éligibilité sectorielle manquante")


def eligibility_geography(get) -> list[str]:
    egr = get("Zones géographiques Régional")
    egr = ", ".join(csv_to_list(egr))
    egs = get("Zones géographiques Spécifique")
    egs = ", ".join(csv_to_list(egs))
    egd = get("Zones géographiques Départemental")
    egd = ", ".join(csv_to_list(egd))
    eg = [eg for eg in [egr, egs, egd] if valid(eg)]
    if len(eg) > 0:
        return eg
    else:
        return ["France et territoires d'outre-mer"]


def eligibility_naf(get) -> Optional[str]:
    en = get("Eligibilité Naf")
    if valid(en):
        return en
    return None


def eligibility_nyears(get) -> str:
    en = get("Eligibilité Existence")
    if valid(en):
        return en
    return "Éligible à toutes les entreprises"


def eligibility_specific(get) -> list[str]:
    es1 = get("Eligibilité Spécifique1")
    es2 = get("Eligibilité Spécifique2")
    es3 = get("Eligibilité Spécifique3")
    return [es for es in [es1, es2, es3] if valid(es)]


def pc_effectifConstraint(effmin, effmax):
    constraint = []
    if valid(effmin) and effmin != 0:
        constraint.append(f"effectif >= {effmin}")
    if valid(effmax):
        constraint.append(f"effectif <= {effmax}")
    if len(constraint) == 0:
        return None
    else:
        return {ALL: constraint}


def pc_secteurActivitéConstraint(get):
    secteurs = [
        "AAgriculture, sylviculture et pêche",
        "BIndustries extractives",
        "CIndustrie manufacturière",
        "DProduction et distribution d'électricité, de gaz, de vapeur et d'air conditionné",
        "EProduction et distribution d'eau, assainissement, gestion des déchets et dépollution",
        "FConstruction",
        "GCommerce, réparation d'automobiles et de motocycles",
        "HTransports et entreposage",
        "IHébergement et restauration",
        "JInformation et communication",
        "KActivités financières et d'assurance",
        "LActivités immobilières",
        "MActivités spécialisées, scientifiques et techniques",
        "NActivités de services administratifs et de soutien",
        "OAdministration publique",
        "PEnseignement",
        "QSanté humaine et action sociale",
        "RArts, spectacles et activités récréatives",
        "SAutres activités de services",
        "TActivités des ménages en tant qu'employeurs, activités indifférenciées des ménages en tant que producteurs de biens et services pour usage propre",
        "UActivités extra-territoriales",
    ]

    secteursInd = [bool(get(sect)) for sect in secteurs]

    if sum(secteursInd) == 0:
        return None

    return {
        "une de ces conditions": [
            f"code NAF niveau 1 . est {s[0]}"
            for s, keep in zip(secteurs, secteursInd)
            if keep
        ]
    }


def pc_objPrioritaire(get):
    objPri = {
        "🏢\nBâtiment": "est rénover mon bâtiment",
        "🚲\nMobilité": "est la mobilité durable",
        "🗑\nDéchets": "est la gestion des déchets",
        "💧\nEau": "est diminuer ma consommation d'eau",
        "⚡️\nEnergie": "est ma performance énergétique",
        "🧑‍🎓\nRH": "est former ou recruter",
        "🌱\nStratégie": "est mon impact environnemental",
        "🏭\néco-conception": "est l'écoconception",
    }

    objPriInd = [bool(get(theme)) for theme in objPri.keys()]
    if sum(objPriInd) == 0:
        return None

    return {
        ANY: [
            f"questionnaire . objectif prioritaire . {objectif}"
            for objectif, keep in zip(objPri.values(), objPriInd)
            if keep
        ]
    }


def pc_regions(get):
    regions = csv_to_list(get("Zones géographiques Régional"))

    if len(regions) == 0:
        return None

    return {ANY: [f"région = {region}" for region in regions]}


def pc_questionnaireRoute(get):
    shouldShowOnPreciseOnly = not bool(
        get('Parcours "Je ne sais pas par où commencer"')
    )

    if not shouldShowOnPreciseOnly:
        return None

    return True


def pc_building_owner(get):
    shouldAddressBuildingOwner = valid(get("Propriétaire"))
    if not shouldAddressBuildingOwner:
        return None
    return True


def pc_eligibility_applicability(validity_start, validity_end):
    has_started = "dispositif . début de validité <= date du jour"
    has_not_ended = "date du jour <= dispositif . fin de validité"

    if not validity_start and not validity_end:
        return {}
    if not validity_start:
        return {"applicable si": has_not_ended}
    if not validity_end:
        return {"applicable si": has_started}
    return {"applicable si": {ALL: [has_started, has_not_ended]}}


def thousandSep(value):
    return "{:,}".format(value).replace(",", " ")


def convertToYaml(d: dict):
    return yaml.safe_dump(d, allow_unicode=True, sort_keys=False)


def readFromYaml(program_path: Path):
    with open(program_path, "r") as f:
        program = yaml.safe_load(f)
    return program


if __name__ == "__main__":
    if len(sys.argv) > 1:
        worksheet = sys.argv[1]
    else:
        worksheet = WORKSHEET

    input = readXL(INPUT_XL_FILE, worksheet)
    headerRowIndex = SKIP_XL_LINES + 1
    colNumbers = identifyColNumbers(input.row(headerRowIndex))

    all_ids = set()
    for i, row in enumerate(input.rows):
        if i <= headerRowIndex:
            pass

        enProductionCol = row[7]
        if enProductionCol == 1:
            id = row[1]
            if id == "":
                id = forgeID(row[3])

            if id in all_ids:
                raise Exception("Duplicate ID !")
            all_ids.add(id)

            print(f"🖊️ {id}.yaml")
            prog = assembleProgramYAML(row, colNumbers, id)
            with open(os.path.join(OUTPUT_DIR, f"{id}.yaml"), "w") as f:
                f.write(prog)
