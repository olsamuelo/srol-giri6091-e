export class Task {
    constructor(
        public readonly id: string,
        public title: string,
        public description: string,
        public status: 'pending' | 'in_progress' | 'completed',
        public createdAt: Date
    ) {} 

    // Logica en la capa de dominio
    complete() {
        this.status = 'completed';
    }
}