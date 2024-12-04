import { HiOutlineHome, HiOutlineUsers } from 'react-icons/hi';
import { TbUsers } from 'react-icons/tb';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { RiUserHeartLine } from 'react-icons/ri';
import { AiOutlineSetting } from 'react-icons/ai';
import {
  TbCalendar,
  TbChartHistogram,
  TbFile,
  TbLockAccess,
} from 'react-icons/tb';

import {
  RiFileList3Line,
  RiHeartLine,
  RiImageLine,
  RiLockPasswordLine,
  RiMoneyDollarCircleLine,
  RiStethoscopeLine,
  RiUserLine,
} from 'react-icons/ri';
import { MdOutlineReviews } from 'react-icons/md';
import { BiCalendar, BiUserPlus } from 'react-icons/bi';

export const MenuDatas = [
  {
    title: 'Dashboard',
    path: '/',
    icon: HiOutlineHome,
  },
  {
    title: 'Patients',
    path: '/patients',
    icon: TbUsers,
  },
  {
    title: 'Réceptions',
    path: '/receptionists',
    icon: HiOutlineUsers,
  },
  {
    title: 'Docteurs',
    path: '/doctors',
    icon: RiUserHeartLine,
  },

  {
    title: 'Rendez-vous',
    path: '/appointments',
    icon: FaRegCalendarAlt,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: AiOutlineSetting,
  },
];

export const medicineData = [
  {
    id: 1,
    name: 'Paracetamol',
    measure: 'Tablet',
    stock: 400,
    price: 1000,
    status: 'Available',
    instraction: 'After meal',
  },
  {
    id: 2,
    name: 'Amoxicillin',
    measure: 'Capsule',
    stock: 200,
    price: 2300,
    status: 'Available',
    instraction: 'After meal',
  },
  {
    id: 3,
    name: 'Ibuprofen',
    measure: 'mm',
    stock: 0,
    price: 5000,
    status: 'Out of stock',
    instraction: 'Before meal',
  },
  {
    id: 4,
    name: 'Aspirin',
    measure: 'cm',
    stock: 370,
    price: 3500,
    status: 'Available',
    instraction: 'After meal',
  },
  {
    id: 5,
    name: 'Diazepam',
    measure: 'gm',
    stock: 0,
    price: 12000,
    status: 'Out of stock',
    instraction: 'Before meal',
  },
  {
    id: 6,
    name: 'Lorazepam',
    measure: 'mg',
    stock: 123,
    price: 15500,
    status: 'Available',
    instraction: 'Before meal',
  },
  {
    id: 7,
    name: 'Codeine',
    measure: 'ml',
    stock: 1,
    price: 30000,
    status: 'Available',
    instraction: 'After meal',
  },
  {
    id: 8,
    name: 'Tramadol',
    measure: 'lb',
    stock: 0,
    price: 200,
    status: 'Out of stock',
    instraction: 'Before meal',
  },
];

export const memberData = [
  {
    id: '1',
    title: 'Hugo Lloris',
    image: '/images/user1.png',
    admin: false,
    email: 'exemple@gmail.com',
    phone: '+212-6 97 83 06 05',
    age: 25,
    gender: 'Mâle',
    blood: 'A+',
    totalAppointments: 5,
    date: '20 Aug 2021',
  },
  {
    id: '2',
    title: 'Mauris auctor',
    image: '/images/user2.png',
    admin: false,
    email: 'maurisauctor@gmail.com',
    phone: '+212-6 97 83 06 05',
    age: 34,
    gender: 'Femelle',
    blood: 'B+',
    totalAppointments: 3,
    date: '22 Nov 2023',
  },
  {
    id: '3',
    title: 'Michael Owen',
    image: '/images/user3.png',
    admin: false,
    phone: '+212-6 97 83 06 05',
    email: 'michaelowen@gmail.com',
    age: 45,
    gender: 'Mâle',
    blood: 'O+',
    totalAppointments: 26,
    date: '12 Jan 2020',
  },
  {
    id: '4',
    title: 'Amina Smith',
    image: '/images/user4.png',
    admin: true,
    phone: '+212-6 97 83 06 05',
    email: 'aminasmith@gmail.com',
    age: 28,
    gender: 'Femelle',
    blood: 'AB+',
    totalAppointments: 17,
    date: '07 Feb 2001',
  },
  {
    id: '5',
    title: 'Minahil Khan',
    image: '/images/user5.png',
    admin: false,
    phone: '+212-6 97 83 06 05',
    email: 'minahilkhan@gmail.com',
    age: 35,
    gender: 'Femelle',
    blood: 'A+',
    totalAppointments: 9,
    date: '30 Dec 2019',
  },
  {
    id: '6',
    title: 'Alex Morgan',
    image: '/images/user6.png',
    admin: false,
    phone: '+212-6 97 83 06 05',
    email: 'alexmorgan@gmail.com',
    age: 29,
    gender: 'Mâle',
    blood: 'B+',
    totalAppointments: 34,
    date: '12 Jan 2020',
  },
  {
    id: '7',
    title: 'John Doe',
    image: '/images/user7.png',
    admin: false,
    phone: '+212-6 97 83 06 05',
    email: 'johndoe@gmail.com',
    age: 32,
    gender: 'Mâle',
    blood: 'O-',
    totalAppointments: 12,
    date: '18 Mar 2023',
  },
  {
    id: '8',
    title: 'David Beckham',
    image: '/images/user8.png',
    admin: false,
    phone: '+212-6 97 83 06 05',
    email: 'davidbackham@gmail.com',
    age: 27,
    gender: 'Femelle',
    blood: 'AB+',
    totalAppointments: 70,
    date: '01 June 2018',
  },
];

export const appointmentsData = [
  {
    id: 1,
    time: '2 hrs later',
    user: memberData[4],
    from: '10:00 AM',
    to: '12:00 PM',
    hours: 2,
    status: 'Pending',
    doctor: memberData[0],
    date: 'Jun 12, 2021',
  },
  {
    id: 2,
    time: '1 hrs ago',
    user: memberData[5],
    from: '13:00 Pm',
    to: '18:00 PM',
    hours: 5,
    status: 'Cancel',
    doctor: memberData[1],
    date: 'Feb 24, 2021',
  },
  {
    id: 3,
    time: '2 hrs ago',
    user: memberData[6],
    from: '10:00 AM',
    to: '12:00 PM',
    hours: 2,
    status: 'Approved',
    doctor: memberData[2],
    date: 'Mar 12, 2023',
  },
  {
    id: 4,
    time: '3 hrs later',
    user: memberData[7],
    from: '06:00 AM',
    to: '08:00 AM',
    hours: 3,
    status: 'Pending',
    doctor: memberData[3],
    date: 'Apr 06, 2023',
  },
  {
    id: 5,
    time: '4 hrs ago',
    user: memberData[3],
    from: '10:00 AM',
    to: '12:00 PM',
    hours: 7,
    status: 'Approved',
    doctor: memberData[4],
    date: 'May 18, 2023',
  },
];

export const dashboardCards = [
  {
    id: 1,
    title: 'Total de Patients',
    icon: TbUsers,
    value: 1600,
    percent: 45.06,
    color: ['bg-subMain', 'text-subMain', '#07b8db'],
    datas: [92, 80, 45, 15, 49, 77, 70, 51, 110, 20, 90, 60],
  },
  {
    id: 2,
    title: 'Rendez-vous',
    icon: TbCalendar,
    value: 130,
    percent: 25.06,
    color: ['bg-yellow-500', 'text-yellow-500', '#F9C851'],
    datas: [20, 50, 75, 15, 108, 97, 70, 41, 50, 20, 90, 60],
  },
  {
    id: 3,
    title: 'Préscriptions',
    icon: TbFile,
    value: 4160,
    percent: 65.06,
    color: ['bg-[#66B5A3]', 'text-[#66B5A3]', '#66B5A3'],
    datas: [92, 80, 45, 15, 49, 77, 70, 51, 110, 20, 90, 60],
  },
];

export const reviewData = [
  {
    id: 1,
    user: memberData[0],
    star: 4,
    comment:
      'Quick appointment scheduling and knowledgeable optometrists.Great service, friendly staff, and thorough eye exams!',
    reviewAbout: {
      name: 'Hospital',
      link: '#',
    },
    date: '29 May 2021',
  },
  {
    id: 2,
    user: memberData[1],
    star: 5,
    comment:
      'Great service, friendly staff, and thorough eye exams!,Clean facility, but felt a bit rushed during my appointment',
    reviewAbout: {
      name: `Dr. ${memberData[1].title}`,
      link: '/doctors/preview/1',
    },
    date: '12 Jan 2021',
  },
  {
    id: 3,
    user: memberData[2],
    star: 2,
    comment:
      'Best product ever this clinic is best for providing the best service. I recommend it',
    reviewAbout: {
      name: `Product: Sunglasses`,
      link: '/',
    },
    date: '04 Aug 2021',
  },
  {
    id: 4,
    user: memberData[3],
    star: 5,
    comment:
      'Great service, friendly staff, and thorough eye exams!,Clean facility, but felt a bit rushed during my appointment',
    reviewAbout: {
      name: `Dr. ${memberData[3].title}`,
      link: '/doctors/preview/3',
    },
    date: '12 Jan 2021',
  },
  {
    id: 5,
    user: memberData[4],
    star: 3,
    comment:
      'Quick appointment scheduling and knowledgeable optometrists.Great service, friendly staff, and thorough eye exams!',
    reviewAbout: {
      name: 'Hospital',
      link: '#',
    },
    date: '04 Aug 2021',
  },
  {
    id: 6,
    user: memberData[5],
    star: 0,
    comment:
      'I use the product but it give me eye problems. I will not use this product again.',
    reviewAbout: {
      name: `Product: Single vision`,
      link: '/',
    },
    date: '09 Apr 2021',
  },
];

export const sortsDatas = {
  status: [
    {
      id: 1,
      name: 'Status...',
    },
    {
      id: 2,
      name: 'En Attente',
    },
    {
      id: 3,
      name: 'Approuvé',
    },
    {
      id: 4,
      name: 'Annulé',
    },
  ],
  instractions: [
    {
      id: 1,
      name: 'Select Instraction',
    },
    {
      id: 2,
      name: 'After Meal',
    },
    {
      id: 3,
      name: 'Before Meal',
    },
  ],
  measure: [
    {
      id: 1,
      name: 'Select Measure',
    },
    {
      id: 2,
      name: 'mg',
    },
    {
      id: 3,
      name: 'ml',
    },
    {
      id: 4,
      name: 'gm',
    },
    {
      id: 5,
      name: 'kg',
    },
    {
      id: 6,
      name: 'lb',
    },
    {
      id: 7,
      name: 'tbsp',
    },
    {
      id: 8,
      name: 'tablet',
    },
    {
      id: 9,
      name: 'capsule',
    },
  ],
  stocks: [
    {
      id: 1,
      name: 'All',
    },
    {
      id: 2,
      name: 'Available',
    },
    {
      id: 3,
      name: 'Out of Stock',
    },
  ],
  service: [
    {
      id: 1,
      name: 'All',
    },
    {
      id: 2,
      name: 'Enabled',
    },
    {
      id: 3,
      name: 'Disabled',
    },
  ],
  title: [
    {
      id: 1,
      name: 'Dr.',
    },
    {
      id: 2,
      name: 'Mr.',
    },
    {
      id: 3,
      name: 'Mrs.',
    },
    {
      id: 4,
      name: 'Ms.',
    },
  ],
  filterPatient: [
    {
      id: 1,
      name: 'Filter par...',
    },
    {
      id: 2,
      name: 'Nouveaux Patients',
    },
    {
      id: 3,
      name: 'Anciens Patients',
    },
  ],
  genderFilter: [
    {
      id: 1,
      name: 'Sexe...',
    },
    {
      id: 2,
      name: 'Mâle',
    },
    {
      id: 3,
      name: 'Femelle',
    },
  ],
  bloodTypeFilter: [
    {
      id: 1,
      name: 'Groupe Sanguin...',
    },
    {
      id: 2,
      name: 'A+',
    },
    {
      id: 3,
      name: 'A-',
    },
    {
      id: 4,
      name: 'B+',
    },
    {
      id: 5,
      name: 'B-',
    },
    {
      id: 6,
      name: 'AB+',
    },
    {
      id: 7,
      name: 'AB-',
    },
    {
      id: 8,
      name: 'O+',
    },
    {
      id: 9,
      name: 'O-',
    },
  ],
  dosage: [
    {
      id: 1,
      name: 'Morning (M)',
      value: 'morning',
    },
    {
      id: 2,
      name: 'Afternoon (A)',
      value: 'afternoon',
    },
    {
      id: 3,
      name: 'Evening (E)',
      value: 'evening',
    },
  ],
  star: [
    {
      id: 1,
      name: 'Filter by Rating',
      value: 'all',
    },
    {
      id: 1,
      name: '0 - Very Bad',
      value: 0,
    },
    {
      id: 2,
      name: '1 - Bad',
      value: 1,
    },
    {
      id: 3,
      name: '2 - Good',
      value: 2,
    },
    {
      id: 4,
      name: '3 - Very Good',
      value: 3,
    },
    {
      id: 5,
      name: '4 - Excellent',
      value: 4,
    },
    {
      id: 6,
      name: '5 - Master',
      value: 5,
    },
  ],
  users: [
    {
      id: 1,
      name: 'Filter by ...',
      value: 'all',
    },
    {
      id: 2,
      name: 'Doctors',
      value: 'doctors',
    },
    {
      id: 3,
      name: 'Hospital',
      value: 'hospital',
    },
    {
      id: 4,
      name: 'Products',
      value: 'products',
    },
  ],
};

export const servicesData = [
  {
    id: 1,
    name: 'Séléctionner un service... ',
  },
  {
    id: 2,
    name: 'chirurgie de cataracte',
    price: 40000,
    date: '23 June, 2021',
    status: true,
  },
  {
    id: 3,
    name: 'chirurgie de retine',
    price: 20000,
    date: '12 Jan, 2022',
    status: true,
  },
  {
    id: 4,
    name: 'chirurgie des annexes',
    price: 50000,
    date: '11 April, 2023',
    status: false,
  },
  {
    id: 5,
    name: 'chirugie de strabisme',
    price: 34000,
    date: '10 Agst, 2021',
    status: true,
  },
  {
    id: 6,
    name: 'chirurgie de cataracte congenitale',
    price: 10400,
    date: '23 June, 2021',
    status: false,
  },
];

export const patientTab = [
  {
    id: 1,
    title: 'Medical Records',
    icon: TbChartHistogram,
  },
  {
    id: 2,
    title: 'Appointments',
    icon: BiCalendar,
  },
  {
    id: 3,
    title: 'Invoices',
    icon: RiFileList3Line,
  },
  {
    id: 4,
    title: 'Payments',
    icon: RiMoneyDollarCircleLine,
  },
  {
    id: 5,
    title: 'Images',
    icon: RiImageLine,
  },
  {
    id: 6,
    title: 'Chart',
    icon: RiStethoscopeLine,
  },
  {
    id: 7,
    title: 'Patient Information',
    icon: RiUserLine,
  },
  {
    id: 8,
    title: 'Health Information',
    icon: RiHeartLine,
  },
];

export const doctorTab = [
  {
    id: 1,
    title: 'Personal Information',
    icon: RiUserLine,
  },
  {
    id: 2,
    title: 'Patients',
    icon: BiUserPlus,
  },
  {
    id: 3,
    title: 'Appointments',
    icon: BiCalendar,
  },
  {
    id: 4,
    title: 'Payments',
    icon: RiMoneyDollarCircleLine,
  },
  {
    id: 5,
    title: 'Invoices',
    icon: RiFileList3Line,
  },
  {
    id: 6,
    title: 'Reviews',
    icon: MdOutlineReviews,
  },
  {
    id: 7,
    title: 'Access Control',
    icon: TbLockAccess,
  },
  {
    id: 8,
    title: 'Change Password',
    icon: RiLockPasswordLine,
  },
];

export const medicalRecodData = [
  {
    id: 1,
    date: '13, Jan 2021',
    amount: 150000,
    data: [
      {
        id: 1,
        title: 'Complaint',
        value: 'Sudden loss of vision,Red eyes,Double vision,Blurred vision',
      },
      {
        id: 2,
        title: 'Diagnosis',
        value: 'High blood pressure, Diabetes, Hypertension',
      },
      {
        id: 3,
        title: 'Treatment',
        value: 'Refractive Lens Exchange (RLE)',
      },
      {
        id: 4,
        title: 'Prescription',
        value: 'Paracetamol, Amoxicillin, Ibuprofen, Aspirin',
      },
    ],
    attachments: [
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
    ],
    vitalSigns: [
      'Blood Pressure: 120/80 mmHg',
      'Pulse Rate: 80 bpm',
      'Respiratory Rate: 16 bpm',
      'Temperature: 36.5 °C',
      'Oxygen Saturation: 98%',
    ],
  },
  {
    id: 2,
    date: '10, Feb 2022',
    amount: 300000,
    data: [
      {
        id: 1,
        title: 'Complaint',
        value: 'Flashing lights and floaters,Watery eyes,Painful vision',
      },
      {
        id: 2,
        title: 'Diagnosis',
        value: 'High cholesterol,Rheumatoid arthritis',
      },
      {
        id: 3,
        title: 'Treatment',
        value: 'Cataracts Surgery, Laser Eye Surgery',
      },
      {
        id: 4,
        title: 'Prescription',
        value: 'Benzocaine, Lidocaine, Mepivacaine, Prilocaine',
      },
    ],
    attachments: [
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
    ],
    vitalSigns: [
      'Weight: 60 kg',
      'Height: 170 cm',
      'BMI: 20.76 kg/m2',
      'Blood Pressure: 120/80 mmHg',
    ],
  },
  {
    id: 3,
    date: '20, Mar 2022',
    amount: 500000,
    data: [
      {
        id: 1,
        title: 'Complaint',
        value: 'Painful eyes,Flashing lights and floaters,Blurred vision',
      },
      {
        id: 2,
        title: 'Diagnosis',
        value: 'Cataracts, Glaucoma, Diabetic eye disease',
      },
      {
        id: 3,
        title: 'Treatment',
        value: 'Paeditaric Ophthalmology,Drooping Eyelids, Laser Eye Surgery',
      },
      {
        id: 4,
        title: 'Prescription',
        value: 'Gingival Gel, Chlorhexidine, Fluoride, Calcium',
      },
    ],
    attachments: [
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
    ],
    vitalSigns: [
      'Temperature: 36.5 °C',
      'Oxygen Saturation: 98%',
      'Blood Pressure: 120/80 mmHg',
      'Pulse Rate: 80 bpm',
      'Respiratory Rate: 16 bpm',
    ],
  },
  {
    id: 4,
    date: '10, Apr 2022',
    amount: 760000,
    data: [
      {
        id: 1,
        title: 'Complaint',
        value: 'Gradual loss of vision,Headache,Vision problems',
      },
      {
        id: 2,
        title: 'Diagnosis',
        value: 'Cataracts, Glaucoma, Diabetic eye disease, Hypertension',
      },
      {
        id: 3,
        title: 'Treatment',
        value: 'Cataracts Surgery, Laser Eye Surgery, Paeditaric Ophthalmology',
      },
      {
        id: 4,
        title: 'Prescription',
        value: 'Tramadol, Codeine, Morphine, Oxycodone',
      },
    ],
    attachments: [
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
    ],
    vitalSigns: [
      'Sugar Level: 120 mg/dL',
      'Oxygen Saturation: 98%',
      'Cholesterol: 200 mg/dL',
      'Blood Pressure: 120/80 mmHg',
    ],
  },
];

export const doctorsData = [
  {
    id: 1,
    user: memberData[0],
    title: 'Dr.',
  },
  {
    id: 2,
    user: memberData[1],
    title: 'Dr.',
  },
  {
    id: 3,
    user: memberData[2],
    title: 'Dr.',
  },
  {
    id: 4,
    user: memberData[3],
    title: 'Dr.',
  },
];

export const receptionsData = [
  {
    id: 1,
    user: memberData[6],
    title: 'Dr.',
  },
  {
    id: 2,
    user: memberData[7],
    title: 'Dr.',
  },
  {
    id: 3,
    user: memberData[5],
    title: 'Dr.',
  },
  {
    id: 4,
    user: memberData[4],
    title: 'Dr.',
  },
  {
    id: 5,
    user: memberData[2],
    title: 'Dr.',
  },
  {
    id: 6,
    user: memberData[1],
    title: 'Dr.',
  },
];

export const patientImages = [
  'https://res.cloudinary.com/ds5bmx4ee/image/upload/v1711607746/Eye%20Clinic%20Dashboard/2_g7b8yh.jpg',
  'https://res.cloudinary.com/ds5bmx4ee/image/upload/v1711607745/Eye%20Clinic%20Dashboard/3_hz4vrd.webp',
  'https://res.cloudinary.com/ds5bmx4ee/image/upload/v1711607746/Eye%20Clinic%20Dashboard/4_mpyrax.jpg',
  'https://res.cloudinary.com/ds5bmx4ee/image/upload/v1711607748/Eye%20Clinic%20Dashboard/5_ezdsku.webp',
  'https://res.cloudinary.com/ds5bmx4ee/image/upload/v1711607746/Eye%20Clinic%20Dashboard/6_iqoxxa.jpg',
  'https://res.cloudinary.com/ds5bmx4ee/image/upload/v1711607746/Eye%20Clinic%20Dashboard/7_yg4sbv.jpg',
  'https://res.cloudinary.com/ds5bmx4ee/image/upload/v1711607752/Eye%20Clinic%20Dashboard/8_joyhf7.png',
  'https://res.cloudinary.com/ds5bmx4ee/image/upload/v1711607749/Eye%20Clinic%20Dashboard/9_zmsbil.jpg',
  'https://res.cloudinary.com/ds5bmx4ee/image/upload/v1711607746/Eye%20Clinic%20Dashboard/1_uhqkrg.jpg',
];

export const chatsData = [
  {
    id: 1,
    user: memberData[0],
    active: '2 min ago',
    status: true,
    message: 'Appointment delay doctor..',
  },
  {
    id: 2,
    user: memberData[1],
    active: '2:30 Pm',
    status: true,
    message: 'Can we have meeting now??',
  },
  {
    id: 3,
    user: memberData[2],
    active: '1:30 Pm',
    status: true,
    message: 'i need your help doctor',
  },
  {
    id: 4,
    user: memberData[3],
    active: 'Yesterday',
    status: true,
    message: 'How are you doing??',
  },
  {
    id: 5,
    user: memberData[4],
    active: '12/4/2024',
    status: false,
    message: 'Delete all patient data',
  },
  {
    id: 6,
    user: memberData[5],
    active: '11/4/2024',
    status: false,
    message: 'Hellow doctor..',
  },
  {
    id: 7,
    user: memberData[6],
    active: '06/4/2024',
    status: false,
    message: 'Need your minute. are you available?    ',
  },
  {
    id: 8,
    user: memberData[7],
    active: '05/3/2024',
    status: false,
    message: 'Morning.',
  },

  {
    id: 9,
    user: memberData[0],
    active: '11/4/2024',
    status: false,
    message: 'Hellow doctor..',
  },
  {
    id: 10,
    user: memberData[3],
    active: '06/4/2024',
    status: false,
    message: 'Need your minute. are you available?    ',
  },
  {
    id: 11,
    user: memberData[1],
    active: '05/3/2024',
    status: false,
    message: 'Morning.',
  },
];

export const convData = [
  {
    id: 1,
    user: memberData[0],
    text: 'Morning dr. Daudi 👐👐',
    time: '12:00 PM',
    imageUrl: '',
    value: {
      image: false,
      me: false,
    },
  },
  {
    id: 2,
    user: memberData[4],
    text: 'Morning how are you doing',
    time: '12:02 PM',
    imageUrl: '',
    value: {
      image: false,
      me: true,
    },
  },
  {
    id: 3,
    user: memberData[0],
    text: 'Im doing well.. is patient 23 room available',
    time: '12:05 PM',
    imageUrl: '',
    value: {
      image: false,
      me: false,
    },
  },
  {
    id: 4,
    user: memberData[0],
    text: 'I need to make appointment with her',
    time: '12:05 PM',
    imageUrl: '',
    value: {
      image: false,
      me: false,
    },
  },
  {
    id: 5,
    user: memberData[4],
    text: 'She is available dear..',
    time: '01:06 PM',
    imageUrl: '',
    value: {
      image: false,
      me: true,
    },
  },
  {
    id: 6,
    user: memberData[0],
    text: 'Ohh thank you 😌😌😌',
    time: '01:09 PM',
    imageUrl: '',
    value: {
      image: false,
      me: false,
    },
  },
  {
    id: 7,
    user: memberData[4],
    text: 'Check out her image...',
    time: '01:14 PM',
    imageUrl: '',
    value: {
      image: false,
      me: true,
    },
  },
  {
    id: 8,
    user: memberData[4],
    text: '',
    time: '01:14 PM',
    imageUrl:
      'https://res.cloudinary.com/ds5bmx4ee/image/upload/v1711607745/Eye%20Clinic%20Dashboard/3_hz4vrd.webp',
    value: {
      image: true,
      me: true,
    },
  },
  {
    id: 9,
    user: memberData[0],
    text: 'I will check on her account 😌',
    time: '01:18 PM',
    imageUrl: '',
    value: {
      image: false,
      me: false,
    },
  },
];
