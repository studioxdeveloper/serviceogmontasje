// Mock data for prototype - Based on Funksjonell Beskrivelse v1.0

export const partners = [
  { id: '1', name: 'Service og Montasje AS', region: 'Landsdekkende', location: 'Hovedkontor', isMain: true, email: 'firmapost@serviceogmontasje.no', phone: '+47 62 12 00 12' },
  { id: '2', name: 'Aktiv Handyman AS', region: 'Oslo/Akershus', location: 'Oslo', isMain: false, email: 'post@aktivhandyman.no', phone: '+47 22 33 44 55' },
  { id: '3', name: 'Elektromedisinsk Service AS', region: 'Østlandet', location: 'Drammen', isMain: false, email: 'post@elektromedisinsk.no', phone: '+47 32 11 22 33' },
  { id: '4', name: 'Helseservice AS', region: 'Vestlandet', location: 'Bergen', isMain: false, email: 'post@helseservice.no', phone: '+47 55 44 33 22' },
  { id: '5', name: 'HVH Service AS', region: 'Vestfold', location: 'Tønsberg', isMain: false, email: 'post@hvhservice.no', phone: '+47 33 22 11 00' },
  { id: '6', name: 'Trollholmen AS', region: 'Midt-Norge', location: 'Trondheim', isMain: false, email: 'post@trollholmen.no', phone: '+47 73 88 77 66' },
  { id: '7', name: 'Hjelpemiddelservice', region: 'Nord-Norge', location: 'Tromsø', isMain: false, email: 'post@hjelpemiddelservice.no', phone: '+47 77 66 55 44' },
  { id: '8', name: 'EL-MED', region: 'Sørlandet', location: 'Kristiansand', isMain: false, email: 'post@el-med.no', phone: '+47 38 11 22 33' },
  { id: '9', name: 'Agder Teknikk', region: 'Agder', location: 'Arendal', isMain: false, email: 'post@agderteknikk.no', phone: '+47 37 00 11 22' },
]

// Customers based on document: NAV, Kommuner, Leverandører
export const customers = [
  // NAV Hjelpemiddelsentraler
  { id: '1', name: 'NAV Hjelpemiddelsentral Oslo', type: 'nav', address: 'Karihaugveien 89', postalCode: '1086', city: 'Oslo', contactPerson: 'Silje Andersen', phone: '23 01 50 00', email: 'hjelpemiddel@nav.no' },
  { id: '2', name: 'NAV Hjelpemiddelsentral Akershus', type: 'nav', address: 'Grønland 75', postalCode: '3045', city: 'Drammen', contactPerson: 'Tor Hansen', phone: '32 21 50 00', email: 'akershus@nav.no' },
  // Kommuner
  { id: '3', name: 'Ullensaker Kommune', type: 'kommune', address: 'Rådhuset', postalCode: '2050', city: 'Jessheim', contactPerson: 'Kari Vik', phone: '66 10 80 00', email: 'post@ullensaker.kommune.no' },
  { id: '4', name: 'Bærum Kommune Hjemmetjenesten', type: 'kommune', address: 'Kommunegården 1', postalCode: '1338', city: 'Sandvika', contactPerson: 'Line Berg', phone: '67 50 40 00', email: 'hjemmetjenesten@baerum.kommune.no' },
  { id: '5', name: 'Hamar Kommune Sykehjem', type: 'kommune', address: 'Parkgata 12', postalCode: '2317', city: 'Hamar', contactPerson: 'Bjørn Haugen', phone: '62 56 30 00', email: 'sykehjem@hamar.kommune.no' },
  // Leverandører
  { id: '6', name: 'Mediq AS', type: 'leverandor', address: 'Buttekvernvegen 5', postalCode: '2382', city: 'Brumunddal', contactPerson: 'Ola Svensby', phone: '99 33 44 55', email: 'ordre@mediq.no' },
  { id: '7', name: 'Hepro AS', type: 'leverandor', address: 'Industriveien 10', postalCode: '3401', city: 'Lier', contactPerson: 'Per Olsen', phone: '32 84 00 00', email: 'ordre@hepro.no' },
  { id: '8', name: 'BanoLife', type: 'leverandor', address: 'Strandveien 50', postalCode: '1366', city: 'Lysaker', contactPerson: 'Anne Lund', phone: '67 11 22 00', email: 'ordre@banolife.no' },
]

export const technicians = [
  // S&M egne teknikere (kun 1 i prototype)
  { id: '1', name: 'Ole Hansen', email: 'ole@serviceogmontasje.no', phone: '912 34 567', partnerId: '1', role: 'technician', activeOrders: 2 },
  // Aktiv Handyman teknikere
  { id: '2', name: 'Kari Nordmann', email: 'kari@aktivhandyman.no', phone: '923 45 678', partnerId: '2', role: 'technician', activeOrders: 3 },
  { id: '3', name: 'Erik Berg', email: 'erik@aktivhandyman.no', phone: '934 56 789', partnerId: '2', role: 'technician', activeOrders: 4 },
  { id: '4', name: 'Marte Vik', email: 'marte@aktivhandyman.no', phone: '967 89 012', partnerId: '2', role: 'technician', activeOrders: 2 },
  // Andre partnere
  { id: '5', name: 'Anna Larsen', email: 'anna@helseservice.no', phone: '945 67 890', partnerId: '4', role: 'technician', activeOrders: 2 },
  { id: '6', name: 'Per Olsen', email: 'per@hvhservice.no', phone: '956 78 901', partnerId: '5', role: 'technician', activeOrders: 6 },
]

export type OrderStatus = 'uaapnet' | 'paabegynt' | 'deler' | 'utfort' | 'fakturert' | 'kansellert'
export type OrderType = 'service' | 'montering' | 'demontering' | 'reparasjon' | 'prosjektering' | 'periodisk_kontroll'
export type Priority = 'lav' | 'normal' | 'hoy' | 'haster'

export interface Order {
  id: string
  orderNumber: string // Changed to string for reference numbers like "Ull-1120"
  customerId: string
  customerName: string
  customerType: string
  reference: string // Customer's reference number
  address: string
  city: string
  equipmentType: string
  equipmentBrand?: string
  equipmentModel?: string
  serialNumber?: string
  partnerId: string
  partnerName: string
  technicianId: string | null
  technicianName: string | null
  orderType: OrderType
  status: OrderStatus
  priority: Priority
  description: string
  scheduledDate: string | null
  deadline: string | null
  completedDate: string | null
  technicianNotes: string | null
  createdAt: string
  // Visibility control - KEY for access model
  isFromSM: boolean // True = order came from S&M (visible to S&M)
  isInternal: boolean // True = partner's internal order (hidden from S&M)
  // Billing info
  hours?: number
  kilometers?: number
  driveTime?: number
  parking?: number
  parts?: string
}

export const orders: Order[] = [
  // ============================================
  // S&M TECHNICIAN ORDERS - For Ole Hansen (technician demo)
  // ============================================
  {
    id: 'T1',
    orderNumber: 'SM-T-001',
    customerId: '1',
    customerName: 'NAV Hjelpemiddelsentral Oslo',
    customerType: 'nav',
    reference: 'NAV-2024-1234',
    address: 'Karihaugveien 89',
    city: 'Oslo',
    equipmentType: 'Elektrisk rullestol',
    equipmentBrand: 'Permobil',
    equipmentModel: 'M3 Corpus',
    serialNumber: 'PM-2024-99001',
    partnerId: '1',
    partnerName: 'Service og Montasje AS',
    technicianId: '1',
    technicianName: 'Ole Hansen',
    orderType: 'service',
    status: 'paabegynt',
    priority: 'normal',
    description: 'Årlig service på elektrisk rullestol. Bruker melder at stolen går litt tregt.',
    scheduledDate: '2026-02-03',
    deadline: '2026-02-05',
    completedDate: null,
    technicianNotes: 'Startet service kl 08:30. Sjekker batteri og motor.',
    createdAt: '2026-01-28',
    isFromSM: true,
    isInternal: false,
    hours: 1.5,
    kilometers: 12,
  },
  {
    id: 'T2',
    orderNumber: 'SM-T-002',
    customerId: '3',
    customerName: 'Ullensaker Kommune',
    customerType: 'kommune',
    reference: 'ULL-2024-567',
    address: 'Jessheim Omsorgssenter',
    city: 'Jessheim',
    equipmentType: 'Takheis',
    equipmentBrand: 'Guldmann',
    equipmentModel: 'GH3',
    serialNumber: 'GH-2022-44332',
    partnerId: '1',
    partnerName: 'Service og Montasje AS',
    technicianId: '1',
    technicianName: 'Ole Hansen',
    orderType: 'periodisk_kontroll',
    status: 'uaapnet',
    priority: 'hoy',
    description: 'Periodisk kontroll av takheis. Må sjekke løftekapasitet og nødstopp.',
    scheduledDate: '2026-02-03',
    deadline: '2026-02-04',
    completedDate: null,
    technicianNotes: null,
    createdAt: '2026-02-01',
    isFromSM: true,
    isInternal: false,
  },
  {
    id: 'T3',
    orderNumber: 'SM-T-003',
    customerId: '4',
    customerName: 'Bærum Kommune Hjemmetjenesten',
    customerType: 'kommune',
    reference: 'BAE-2024-890',
    address: 'Hospice Stabekk',
    city: 'Stabekk',
    equipmentType: 'Sykeseng',
    equipmentBrand: 'Invacare',
    equipmentModel: 'Medley Ergo',
    serialNumber: 'INV-2021-77665',
    partnerId: '1',
    partnerName: 'Service og Montasje AS',
    technicianId: '1',
    technicianName: 'Ole Hansen',
    orderType: 'reparasjon',
    status: 'uaapnet',
    priority: 'haster',
    description: 'AKUTT: Sykeseng går ikke ned. Pasient ligger i sengen. Må fikses i dag!',
    scheduledDate: '2026-02-03',
    deadline: '2026-02-03',
    completedDate: null,
    technicianNotes: null,
    createdAt: '2026-02-03',
    isFromSM: true,
    isInternal: false,
  },
  {
    id: 'T4',
    orderNumber: 'SM-T-004',
    customerId: '6',
    customerName: 'Mediq AS',
    customerType: 'leverandor',
    reference: 'MEDIQ-55443',
    address: 'Lørenskog Sykehjem',
    city: 'Lørenskog',
    equipmentType: 'Personløfter',
    equipmentBrand: 'Molift',
    equipmentModel: 'Mover 180',
    serialNumber: 'MOL-2023-11223',
    partnerId: '1',
    partnerName: 'Service og Montasje AS',
    technicianId: '1',
    technicianName: 'Ole Hansen',
    orderType: 'montering',
    status: 'uaapnet',
    priority: 'normal',
    description: 'Montering av ny personløfter. Leverandør har levert utstyret.',
    scheduledDate: '2026-02-04',
    deadline: '2026-02-07',
    completedDate: null,
    technicianNotes: null,
    createdAt: '2026-02-01',
    isFromSM: true,
    isInternal: false,
  },
  {
    id: 'T5',
    orderNumber: 'SM-T-005',
    customerId: '1',
    customerName: 'NAV Hjelpemiddelsentral Oslo',
    customerType: 'nav',
    reference: 'NAV-2024-1189',
    address: 'Grorud Senter',
    city: 'Oslo',
    equipmentType: 'Trappeheis',
    equipmentBrand: 'Handicare',
    equipmentModel: '1100',
    serialNumber: 'HC-2020-55667',
    partnerId: '1',
    partnerName: 'Service og Montasje AS',
    technicianId: '1',
    technicianName: 'Ole Hansen',
    orderType: 'service',
    status: 'utfort',
    priority: 'normal',
    description: 'Årlig service av trappeheis. Fullført uten anmerkninger.',
    scheduledDate: '2026-02-01',
    deadline: '2026-02-03',
    completedDate: '2026-02-01',
    technicianNotes: 'Service utført. Smurt skinne, testet nødstopp, sjekket batteri. Alt OK.',
    createdAt: '2026-01-25',
    isFromSM: true,
    isInternal: false,
    hours: 2,
    kilometers: 18,
  },
  {
    id: 'T6',
    orderNumber: 'SM-T-006',
    customerId: '5',
    customerName: 'Hamar Kommune Sykehjem',
    customerType: 'kommune',
    reference: 'HAM-2024-234',
    address: 'Furuberget Sykehjem',
    city: 'Hamar',
    equipmentType: 'Dusjstol',
    equipmentBrand: 'Etac',
    equipmentModel: 'Clean',
    serialNumber: 'ETA-2022-33445',
    partnerId: '1',
    partnerName: 'Service og Montasje AS',
    technicianId: '1',
    technicianName: 'Ole Hansen',
    orderType: 'reparasjon',
    status: 'deler',
    priority: 'normal',
    description: 'Hjul på dusjstol er ødelagt. Må byttes.',
    scheduledDate: '2026-02-05',
    deadline: '2026-02-10',
    completedDate: null,
    technicianNotes: 'Bestilt nye hjul fra Etac. Estimert levering 04.02.',
    createdAt: '2026-01-30',
    isFromSM: true,
    isInternal: false,
  },

  // ============================================
  // ORDERS FROM SERVICE OG MONTASJE → DISTRIBUTED TO PARTNERS
  // These are VISIBLE to S&M Admin
  // ============================================
  {
    id: '1',
    orderNumber: '12345678',
    customerId: '6',
    customerName: 'Mediq AS',
    customerType: 'leverandor',
    reference: '12345678',
    address: 'Buttekvernvegen 5',
    city: 'Brumunddal',
    equipmentType: 'Closomat',
    equipmentBrand: 'Closomat',
    equipmentModel: 'Palma Vita',
    serialNumber: null,
    partnerId: '5', // HVH Service
    partnerName: 'HVH Service AS',
    technicianId: '6',
    technicianName: 'Per Olsen',
    orderType: 'prosjektering',
    status: 'paabegynt',
    priority: 'normal',
    description: 'Prosjektering av Closomat tilsats hos bruker. Må ta mål og vurdere monteringsmuligheter.',
    scheduledDate: '2026-02-05',
    deadline: '2026-02-19',
    completedDate: null,
    technicianNotes: 'Avtalt møte med bruker 05.02',
    createdAt: '2026-02-01',
    isFromSM: true,
    isInternal: false,
    hours: 2.5,
    kilometers: 45,
    driveTime: 1,
  },
  {
    id: '2',
    orderNumber: 'Ull-1120',
    customerId: '3',
    customerName: 'Ullensaker Kommune',
    customerType: 'kommune',
    reference: 'Ull-1120',
    address: 'Jessheim Sykehjem',
    city: 'Jessheim',
    equipmentType: 'Seng',
    equipmentBrand: 'Invacare',
    equipmentModel: 'Medley Ergo',
    serialNumber: 'INV-2021-55544',
    partnerId: '8', // EL-MED
    partnerName: 'EL-MED',
    technicianId: null,
    technicianName: null,
    orderType: 'service',
    status: 'uaapnet',
    priority: 'normal',
    description: 'Service på sykeseng. Bruker rapporterer problem med ryggstøtte.',
    scheduledDate: null,
    deadline: '2026-02-20',
    completedDate: null,
    technicianNotes: null,
    createdAt: '2026-02-02',
    isFromSM: true,
    isInternal: false,
  },
  {
    id: '3',
    orderNumber: '31245678',
    customerId: '6',
    customerName: 'Mediq AS',
    customerType: 'leverandor',
    reference: '31245678',
    address: 'Hamar Sykehjem',
    city: 'Hamar',
    equipmentType: 'Takheis',
    equipmentBrand: 'Guldmann',
    equipmentModel: 'GH3',
    serialNumber: 'GH-2022-12345',
    partnerId: '6', // Trollholmen
    partnerName: 'Trollholmen AS',
    technicianId: null,
    technicianName: null,
    orderType: 'montering',
    status: 'paabegynt',
    priority: 'hoy',
    description: 'Montering av ny takheis i bad. Elektriker må også involveres.',
    scheduledDate: '2026-02-03',
    deadline: '2026-02-10',
    completedDate: null,
    technicianNotes: null,
    createdAt: '2026-01-28',
    isFromSM: true,
    isInternal: false,
  },
  {
    id: '4',
    orderNumber: '41235678',
    customerId: '8',
    customerName: 'BanoLife',
    customerType: 'leverandor',
    reference: '41235678',
    address: 'Kristiansand Sykehjem',
    city: 'Kristiansand',
    equipmentType: 'Dusjstol',
    equipmentBrand: 'Etac',
    equipmentModel: 'Clean',
    serialNumber: null,
    partnerId: '9', // Agder Teknikk
    partnerName: 'Agder Teknikk',
    technicianId: null,
    technicianName: null,
    orderType: 'service',
    status: 'deler',
    priority: 'normal',
    description: 'Service og utskifting av hjul på dusjstol.',
    scheduledDate: '2026-02-04',
    deadline: '2026-02-15',
    completedDate: null,
    technicianNotes: 'Venter på deler fra leverandør',
    createdAt: '2026-01-30',
    isFromSM: true,
    isInternal: false,
  },
  {
    id: '5',
    orderNumber: 'PO-12345',
    customerId: '7',
    customerName: 'Hepro AS',
    customerType: 'leverandor',
    reference: 'PO 12345',
    address: 'Tønsberg Sykehus',
    city: 'Tønsberg',
    equipmentType: 'Personløfter',
    equipmentBrand: 'Molift',
    equipmentModel: 'Smart 150',
    serialNumber: 'MOL-2020-88899',
    partnerId: '5', // HVH
    partnerName: 'HVH Service AS',
    technicianId: '6',
    technicianName: 'Per Olsen',
    orderType: 'prosjektering',
    status: 'paabegynt',
    priority: 'haster',
    description: 'Prosjektering for montering av personløfter. Frist overskredet!',
    scheduledDate: '2026-01-30',
    deadline: '2026-01-25',
    completedDate: null,
    technicianNotes: null,
    createdAt: '2026-01-20',
    isFromSM: true,
    isInternal: false,
  },

  // ============================================
  // ORDERS FROM S&M → AKTIV HANDYMAN (for Partner demo)
  // ============================================
  {
    id: '10',
    orderNumber: 'SM-2024-0891',
    customerId: '4',
    customerName: 'Bærum Kommune Hjemmetjenesten',
    customerType: 'kommune',
    reference: 'SM-2024-0891',
    address: 'Sandvika Omsorgssenter',
    city: 'Sandvika',
    equipmentType: 'Løfteplattform',
    equipmentBrand: 'Handicare',
    equipmentModel: 'E8000',
    serialNumber: 'HC-2022-12345',
    partnerId: '2', // Aktiv Handyman
    partnerName: 'Aktiv Handyman AS',
    technicianId: '2',
    technicianName: 'Kari Nordmann',
    orderType: 'reparasjon',
    status: 'paabegynt',
    priority: 'hoy',
    description: 'Løfteplattform stopper halvveis opp. Feilkode E3 vises på display.',
    scheduledDate: '2026-02-02',
    deadline: '2026-02-05',
    completedDate: null,
    technicianNotes: 'Ankom kl 09:00. Fant feil på sensor. Bestiller ny del.',
    createdAt: '2026-01-30',
    isFromSM: true,
    isInternal: false,
    hours: 2,
    kilometers: 25,
  },
  {
    id: '11',
    orderNumber: 'SM-2024-0895',
    customerId: '4',
    customerName: 'Bærum Kommune Hjemmetjenesten',
    customerType: 'kommune',
    reference: 'SM-2024-0895',
    address: 'Stabekk Sykehjem',
    city: 'Stabekk',
    equipmentType: 'Personløfter',
    equipmentBrand: 'Molift',
    equipmentModel: 'Smart 150',
    serialNumber: 'MOL-2019-11111',
    partnerId: '2',
    partnerName: 'Aktiv Handyman AS',
    technicianId: '3',
    technicianName: 'Erik Berg',
    orderType: 'service',
    status: 'uaapnet',
    priority: 'haster',
    description: 'Klage: Personløfter lager høy pipelyd ved bruk. Må utbedres snarest.',
    scheduledDate: '2026-02-03',
    deadline: '2026-02-03',
    completedDate: null,
    technicianNotes: null,
    createdAt: '2026-02-01',
    isFromSM: true,
    isInternal: false,
  },
  {
    id: '12',
    orderNumber: 'SM-2024-0878',
    customerId: '1',
    customerName: 'NAV Hjelpemiddelsentral Oslo',
    customerType: 'nav',
    reference: 'NAV-HMS-4521',
    address: 'Karihaugveien 89',
    city: 'Oslo',
    equipmentType: 'Elektrisk rullestol',
    equipmentBrand: 'Permobil',
    equipmentModel: 'M3 Corpus',
    serialNumber: 'PM-2023-45678',
    partnerId: '2',
    partnerName: 'Aktiv Handyman AS',
    technicianId: '2',
    technicianName: 'Kari Nordmann',
    orderType: 'periodisk_kontroll',
    status: 'utfort',
    priority: 'normal',
    description: 'Årlig periodisk kontroll av elektrisk rullestol.',
    scheduledDate: '2026-01-29',
    deadline: '2026-02-01',
    completedDate: '2026-01-29',
    technicianNotes: 'Kontroll utført. Alt OK. Smurt og justert.',
    createdAt: '2026-01-20',
    isFromSM: true,
    isInternal: false,
    hours: 1.5,
    kilometers: 15,
  },

  // ============================================
  // AKTIV HANDYMAN INTERNAL ORDERS - HIDDEN FROM S&M!
  // These are the partner's own jobs, not from S&M
  // ============================================
  {
    id: '20',
    orderNumber: 'AH-INT-001',
    customerId: '1',
    customerName: 'Privatperson - Knut Eriksen',
    customerType: 'privat',
    reference: 'Direktekunde',
    address: 'Storgata 45',
    city: 'Oslo',
    equipmentType: 'Trappeheis',
    equipmentBrand: 'Otolift',
    equipmentModel: 'ONE',
    serialNumber: 'OTO-2023-77777',
    partnerId: '2',
    partnerName: 'Aktiv Handyman AS',
    technicianId: '4',
    technicianName: 'Marte Vik',
    orderType: 'service',
    status: 'paabegynt',
    priority: 'normal',
    description: 'Årlig service av trappeheis. Direktekunde - ikke via S&M.',
    scheduledDate: '2026-02-04',
    deadline: '2026-02-10',
    completedDate: null,
    technicianNotes: null,
    createdAt: '2026-01-25',
    isFromSM: false, // NOT from S&M
    isInternal: true, // Internal order - hidden from S&M!
  },
  {
    id: '21',
    orderNumber: 'AH-INT-002',
    customerId: '2',
    customerName: 'Borettslag Majorstuen',
    customerType: 'privat',
    reference: 'Serviceavtale 2026',
    address: 'Bogstadveien 50',
    city: 'Oslo',
    equipmentType: 'Løfteplattform',
    equipmentBrand: 'Cibes',
    equipmentModel: 'A5000',
    serialNumber: 'CIB-2020-33322',
    partnerId: '2',
    partnerName: 'Aktiv Handyman AS',
    technicianId: '3',
    technicianName: 'Erik Berg',
    orderType: 'periodisk_kontroll',
    status: 'uaapnet',
    priority: 'lav',
    description: 'Årlig kontroll av fellesløfteplattform. Egen serviceavtale med borettslaget.',
    scheduledDate: '2026-02-10',
    deadline: '2026-02-28',
    completedDate: null,
    technicianNotes: null,
    createdAt: '2026-02-01',
    isFromSM: false,
    isInternal: true,
  },
  {
    id: '22',
    orderNumber: 'AH-INT-003',
    customerId: '3',
    customerName: 'Sameiet Frogner Terrasse',
    customerType: 'privat',
    reference: 'Reparasjon akutt',
    address: 'Frognerveien 12',
    city: 'Oslo',
    equipmentType: 'Heis',
    equipmentBrand: 'KONE',
    equipmentModel: 'MonoSpace',
    serialNumber: 'KON-2015-12345',
    partnerId: '2',
    partnerName: 'Aktiv Handyman AS',
    technicianId: '2',
    technicianName: 'Kari Nordmann',
    orderType: 'reparasjon',
    status: 'deler',
    priority: 'hoy',
    description: 'Heis står. Venter på deler. Direktekunde - borettslag.',
    scheduledDate: '2026-02-02',
    deadline: '2026-02-05',
    completedDate: null,
    technicianNotes: 'Diagnostikk utført. Motorstyring defekt. Bestilt del.',
    createdAt: '2026-01-31',
    isFromSM: false,
    isInternal: true,
    hours: 3,
  },
]

export const statusLabels: Record<OrderStatus, string> = {
  uaapnet: 'Uåpnet',
  paabegynt: 'Påbegynt',
  deler: 'Venter deler',
  utfort: 'Utført',
  fakturert: 'Fakturert',
  kansellert: 'Kansellert',
}

export const statusColors: Record<OrderStatus, string> = {
  uaapnet: 'bg-gray-100 text-gray-800',
  paabegynt: 'bg-amber-100 text-amber-800',
  deler: 'bg-purple-100 text-purple-800',
  utfort: 'bg-green-100 text-green-800',
  fakturert: 'bg-blue-100 text-blue-800',
  kansellert: 'bg-red-100 text-red-800',
}

export const orderTypeLabels: Record<OrderType, string> = {
  service: 'Service',
  montering: 'Montering',
  demontering: 'Demontering',
  reparasjon: 'Reparasjon',
  prosjektering: 'Prosjektering',
  periodisk_kontroll: 'Periodisk kontroll',
}

export const priorityLabels: Record<Priority, string> = {
  lav: 'Lav',
  normal: 'Normal',
  hoy: 'Høy',
  haster: 'Haster',
}

export const priorityColors: Record<Priority, string> = {
  lav: 'bg-slate-100 text-slate-700',
  normal: 'bg-blue-100 text-blue-700',
  hoy: 'bg-orange-100 text-orange-700',
  haster: 'bg-red-100 text-red-700',
}

export const customerTypeLabels: Record<string, string> = {
  nav: 'NAV',
  kommune: 'Kommune',
  leverandor: 'Leverandør',
  privat: 'Privat',
}

// Stats for dashboard
export const dashboardStats = {
  totalOrders: 156,
  newOrders: 12,
  inProgress: 34,
  completedThisMonth: 89,
  avgCompletionTime: '2.3 dager',
  technicianUtilization: '78%',
}

// ============================================
// HELPER FUNCTIONS FOR ACCESS CONTROL
// ============================================

// S&M Admin sees: All orders that came FROM S&M (isFromSM = true)
// Does NOT see: Partner's internal orders (isInternal = true)
export function getOrdersVisibleToSM(): Order[] {
  return orders.filter(o => o.isFromSM && !o.isInternal)
}

// Partner sees: Orders assigned to them from S&M + their own internal orders
export function getOrdersForPartner(partnerId: string): Order[] {
  return orders.filter(o => o.partnerId === partnerId)
}

// Partner's internal orders only (hidden from S&M)
export function getInternalOrdersForPartner(partnerId: string): Order[] {
  return orders.filter(o => o.partnerId === partnerId && o.isInternal)
}

// Orders from S&M to a specific partner
export function getSMOrdersForPartner(partnerId: string): Order[] {
  return orders.filter(o => o.partnerId === partnerId && o.isFromSM && !o.isInternal)
}

// Check if deadline is overdue
export function isOverdue(order: Order): boolean {
  if (!order.deadline || order.status === 'utfort' || order.status === 'fakturert') return false
  return new Date(order.deadline) < new Date()
}
