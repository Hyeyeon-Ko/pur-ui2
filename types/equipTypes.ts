export interface RepairRow {
  centerName: string;
  type: string;
  repairDate: string | null;
  documentNumber: string;
  faultSymptom: string;
  repairContent: string;
  partner: string;
  partNumber: string;
  cost: string;
  warranty: string;
  maintenanceCost: string;
  inspectionCheck: string;
  notes: string;
  isNew?: boolean;
  isSelected?: boolean;
}
