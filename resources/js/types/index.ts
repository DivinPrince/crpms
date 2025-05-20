// CRPMS Types
export interface Service {
    ServiceCode: string;
    ServiceName: string;
    ServicePrice: number;
    created_at: string;
    updated_at: string;
}

export interface Car {
    PlateNumber: string;
    Type: string;
    Model: string;
    ManufacturingYear: number;
    DriverPhone: string;
    MechanicName: string;
    created_at: string;
    updated_at: string;
}

export interface ServiceRecord {
    RecordNumber: string;
    ServiceDate: string;
    CarPlateNumber: string;
    ServiceCode: string;
    created_at: string;
    updated_at: string;
    car?: Car;
    service?: Service;
    payment?: Payment;
}

export interface Payment {
    PaymentNumber: string;
    AmountPaid: number;
    PaymentDate: string;
    RecordNumber: string;
    created_at: string;
    updated_at: string;
    serviceRecord?: ServiceRecord;
} 