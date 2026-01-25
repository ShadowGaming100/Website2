export interface Host {
  id: number;
  name: string;
  website: string;
  description: string;
  rating: number;
  url: string;
  icon: string;
  banner: string;
  ram?: number;
  storage?: number;
  cores?: number;
  features: string[]; 
  type: string;
  location?: string[];
  locale: string[];    
  targets: string[]; 
  created_at: string;
  approvals: number;
  disapprovals: number;
  notes?: string;
  renewal?: string;
  features_detailed?: Array<{
    title: string;
    description: string;
  }>;
  links?: {
    [key: string]: string;
  };
  attributes?: {
    free_subdomain: boolean;
    custom_domain: boolean;
    ftp: boolean;
    ssh: boolean;
    mysql: boolean;
    no_ads: boolean;
    instant_activation: boolean;
  };
}

export type SortOption = 'random' | 'rating_desc' | 'rating_asc' | 'name_asc' | 'name_desc' | 'cpu_desc' | 'ram_desc' | 'storage_desc' | 'date_newest';
