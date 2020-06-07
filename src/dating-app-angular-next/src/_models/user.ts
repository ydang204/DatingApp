import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: string;
    photoUrl: string;
    city: string;
    country: string;
    knownAs: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}
