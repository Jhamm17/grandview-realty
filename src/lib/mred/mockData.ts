import { Property } from './api';

const MOCK_PROPERTIES: Property[] = [
    {
        ListingKey: "GV1001",
        ListPrice: 599000,
        BedroomsTotal: 4,
        BathroomsTotalInteger: 3,
        LivingArea: 2500,
        City: "Geneva",
        StateOrProvince: "IL",
        PostalCode: "60134",
        StandardStatus: "Active",
        PublicRemarks: "Beautiful colonial home in the heart of Geneva. Features include hardwood floors throughout, updated kitchen with granite countertops, and a spacious backyard perfect for entertaining.",
        Photos: ["/property-1.jpg", "/property-1-2.jpg", "/property-1-3.jpg"]
    },
    {
        ListingKey: "GV1002",
        ListPrice: 425000,
        BedroomsTotal: 3,
        BathroomsTotalInteger: 2,
        LivingArea: 1800,
        City: "St. Charles",
        StateOrProvince: "IL",
        PostalCode: "60174",
        StandardStatus: "Active",
        PublicRemarks: "Charming ranch-style home in desirable St. Charles neighborhood. Recently updated with new appliances, fresh paint, and modern fixtures throughout.",
        Photos: ["/property-2.jpg", "/property-2-2.jpg", "/property-2-3.jpg"]
    },
    {
        ListingKey: "GV1003",
        ListPrice: 875000,
        BedroomsTotal: 5,
        BathroomsTotalInteger: 4,
        LivingArea: 3500,
        City: "Geneva",
        StateOrProvince: "IL",
        PostalCode: "60134",
        StandardStatus: "Under Contract",
        PublicRemarks: "Stunning Victorian mansion with original architectural details. Features include a gourmet kitchen, primary suite with spa bathroom, and professionally landscaped grounds.",
        Photos: ["/property-3.jpg", "/property-3-2.jpg", "/property-3-3.jpg"]
    },
    {
        ListingKey: "GV1004",
        ListPrice: 349900,
        BedroomsTotal: 2,
        BathroomsTotalInteger: 2,
        LivingArea: 1200,
        City: "Batavia",
        StateOrProvince: "IL",
        PostalCode: "60510",
        StandardStatus: "Active",
        PublicRemarks: "Perfect starter home or downsizer in quiet Batavia neighborhood. Open concept living area, updated kitchen, and private fenced backyard.",
        Photos: ["/property-1.jpg", "/property-1-2.jpg"]
    },
    {
        ListingKey: "GV1005",
        ListPrice: 725000,
        BedroomsTotal: 4,
        BathroomsTotalInteger: 3,
        LivingArea: 2800,
        City: "Geneva",
        StateOrProvince: "IL",
        PostalCode: "60134",
        StandardStatus: "Active",
        PublicRemarks: "Luxurious modern home in Geneva's newest development. Smart home features, energy-efficient systems, and premium finishes throughout.",
        Photos: ["/property-2.jpg", "/property-2-2.jpg"]
    }
];

export class MockMREDApi {
    private static instance: MockMREDApi;

    private constructor() {}

    public static getInstance(): MockMREDApi {
        if (!MockMREDApi.instance) {
            MockMREDApi.instance = new MockMREDApi();
        }
        return MockMREDApi.instance;
    }

    public async searchProperties(params: {
        city?: string;
        minPrice?: number;
        maxPrice?: number;
        beds?: number;
        baths?: number;
        status?: string;
        limit?: number;
    }): Promise<Property[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let filteredProperties = [...MOCK_PROPERTIES];

        if (params.city) {
            filteredProperties = filteredProperties.filter(p => 
                p.City.toLowerCase() === params.city?.toLowerCase()
            );
        }

        if (params.minPrice) {
            filteredProperties = filteredProperties.filter(p => 
                p.ListPrice >= params.minPrice!
            );
        }

        if (params.maxPrice) {
            filteredProperties = filteredProperties.filter(p => 
                p.ListPrice <= params.maxPrice!
            );
        }

        if (params.beds) {
            filteredProperties = filteredProperties.filter(p => 
                p.BedroomsTotal === params.beds
            );
        }

        if (params.baths) {
            filteredProperties = filteredProperties.filter(p => 
                p.BathroomsTotalInteger === params.baths
            );
        }

        if (params.status) {
            filteredProperties = filteredProperties.filter(p => 
                p.StandardStatus === params.status
            );
        }

        if (params.limit) {
            filteredProperties = filteredProperties.slice(0, params.limit);
        }

        return filteredProperties;
    }

    public async getProperty(listingKey: string): Promise<Property> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));

        const property = MOCK_PROPERTIES.find(p => p.ListingKey === listingKey);
        if (!property) {
            throw new Error(`Property with listing key ${listingKey} not found`);
        }

        return property;
    }

    public async getPropertyPhotos(listingKey: string): Promise<string[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 200));

        const property = MOCK_PROPERTIES.find(p => p.ListingKey === listingKey);
        if (!property || !property.Photos) {
            return [];
        }

        return property.Photos;
    }
}

export const mockMredApi = MockMREDApi.getInstance(); 