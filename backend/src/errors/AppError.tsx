import type { $ZodIssue } from "zod/v4/core";

export default class AppError extends Error {

    private readonly statusCode: number;
    private readonly zodFields?: $ZodIssue[];
    private formatter?: string[];

    constructor(message: string, statusCode: number, zodFields?: $ZodIssue[]) {
        super(message);
        this.statusCode = statusCode;

        if (zodFields && zodFields.length > 0) {
            this.zodFields = zodFields;
            this.zodFieldsFormatter();
        }

        Object.setPrototypeOf(this, new.target.prototype);
    }

    private zodFieldsFormatter(): void {
        if (!this.zodFields || this.zodFields.length === 0) return;
        this.formatter = this.zodFields.map(
            field => `${field.path.join('').replace('0', '')}: ${field.message}`
        );
    }

    public get StatusCode(): number {
        return this.statusCode;
    }

    public get ZodFields(): $ZodIssue[] | undefined {
        return this.zodFields;
    }

    public get Formatter(): string[] | undefined {
        return this.formatter;
    }
}