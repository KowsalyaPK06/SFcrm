interface LeadData {
    "attribute"?: object;
    "Salutation"?: string;
    "FirstName"?: string;
    "LastName"?: string;
    "Company"?: string;
    "Mobile"?: string;
    "Phone"?: string;
    "Email"?: string;
}

export class Lead implements LeadData {
    constructor(
    ) { }
}