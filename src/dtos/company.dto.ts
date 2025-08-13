export interface CreateCompanyDTO {
  name: string;
  registrationNumber: string;
}

export interface CompanyResponseDTO {
  id: number;
  name: string;
  registrationNumber: string;
  services?: any[];
}
