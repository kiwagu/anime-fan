export interface CreateHeroDTO {
  name: string;
  description?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
}
