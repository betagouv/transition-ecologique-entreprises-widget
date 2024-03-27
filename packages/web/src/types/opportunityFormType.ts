export interface opportunityFormType {
  [key: string]: { required: boolean; value: string | undefined } | { required: boolean; value: boolean }
  name: { required: true; value: string | undefined }
  surname: { required: true; value: string | undefined }
  tel: { required: true; value: string | undefined }
  email: { required: true; value: string | undefined }
  siret: { required: true; value: string | undefined }
  needs: { required: true; value: string | undefined }
  cgu: { required: true; value: boolean }
}
