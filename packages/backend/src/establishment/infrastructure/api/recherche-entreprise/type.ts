export interface RechercheEntrepriseSearch {
  results?: RechercheEntrepriseEstablishment[] | null
  total_results: number
  page: number
  per_page: number
  total_pages: number
}

export interface RechercheEntrepriseEstablishment {
  siren: string
  nom_raison_sociale: string
  nom_complet: string

  siege: Siege
  activite_principale: string // NafCode
  nature_juridique: string
  section_activite_principale: string // NafSectionCode
  date_creation: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface Siege {
  siret: string
  code_postal: string
  commune: string //code INSEE

  libelle_commune: string
  numero_voie: string
  type_voie: string
  libelle_voie: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
