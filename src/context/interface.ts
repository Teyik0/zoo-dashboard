export interface Area {
  id: string;
  name: string;
  capacity: number;
  visiteDuration: number;
  description: string;
  schedule: string;
  handicapAccess: boolean;
  isInMaintenance: boolean;
  imagesUrl: string[];
}

export interface Animal {
  id: string;
  name: string;
  specieId: string;
  areaId: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  firstName: string;
  lastName: string;
  role:
    | 'admin'
    | 'receptioniste'
    | 'veterinaire'
    | 'agentEntretien'
    | 'vendeur'
    | 'undefined';
}

export interface refreshToken {
  id?: string;
  hashedToken?: string;
  userId?: string;
  jti?: string;
  user?: User;
  revoked?: boolean;
  updatedAt?: Date;
}

export interface Specie {
  id: string;
  name: string;
  imgUrl: string[];
  description: string;
}

export interface Visitor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  areaId?: string;
}

export interface Billet {
  id?: string;
  category?: 'enfant' | 'adulte' | 'etudiant';
  pass?: 'daily' | 'weekend' | 'annual' | 'oneDayMonth';
  price?: number;
  createdAt?: Date;
  expiredAt?: Date;
  visitorId?: string;
  authorizedAreaIds?: string[];
  isExpired?: boolean;
}

export interface Session {
  accessToken: string | null;
  refreshToken: string | null;
}
