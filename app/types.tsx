export interface User {
    id: number;
    username: string;
    password: string;
    role: string;
    owner_token: string;
    createdAt: string;
    updatedAt: string;
}

export interface Admin {
    id: number;
    user_id: number;
    name: string;
    phone: string;
    owner_token: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

export interface Services {
    description?: string;
    title(title: any): [any, any];
    id: number;
    name: string;
    min_usage: number;
    max_usage: number;
    price: number;
    owner_token: string;
    createdAt: string;
    updatedAt: string;
}

export interface customer {
  id: number
  user_id: number
  customer_number: string
  name: string
  phone: string
  address: string
  service_id: number
  owner_token: string
  createdAt: string
  updatedAt: string
  user: User
}

    