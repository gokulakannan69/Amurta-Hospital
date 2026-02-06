export interface BookingData {
  mode: string;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
}

export type Language = 'tm' | 'en';

export type TabType = 'home' | 'treatments' | 'profile';

export interface Translation {
  hospitalName: string;
  hospitalSubtitle: string;
  bookNow: string;
  hub: string;
  care: string;
  doctor: string;
  specializedIntake: string;
  drName: string;
  drTitle: string;
  heroDesc: string;
  startRegistration: string;
  nadiDiagnosis: string;
  panchakarma: string;
  realTimeSync: string;
  harurCenter: string;
  therapyProtocols: string;
  therapySubtitle: string;
  chooseTherapy: string;
  clinicalDirector: string;
  medicalHead: string;
  harur: string;
  profileDesc: string;
  startConsult: string;
  intake: string;
  section: string;
  of: string;
  consultationFormat: string;
  treatmentSpecialty: string;
  visitDate: string;
  timeSlot: string;
  patientName: string;
  phoneNumber: string;
  fullName: string;
  mobileNo: string;
  registerSync: string;
  back: string;
  next: string;
  saved: string;
  successMsg: string;
  returnToHub: string;
  recordingData: string;
  registrationError: string;
  morning: string;
  evening: string;
}

export interface Treatment {
  tm: string;
  en: string;
  descTm: string;
  descEn: string;
}

export interface ServiceMode {
  id: string;
  tm: string;
  en: string;
  icon: any;
}

export interface BookingService {
  tm: string;
  en: string;
}
