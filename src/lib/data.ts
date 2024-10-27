import { HiOutlineHome, HiOutlineUsers } from 'react-icons/hi';
import { TbUsers } from 'react-icons/tb';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { RiUserHeartLine } from 'react-icons/ri';
import { AiOutlineSetting } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import {
  TbCalendar,
  TbChartHistogram,
  TbFile,
  TbFileInvoice,
  TbLockAccess,
} from 'react-icons/tb';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import {
  RiFileList3Line,
  RiHeartLine,
  RiImageLine,
  RiLockPasswordLine,
  RiMedicineBottleLine,
  RiMoneyDollarCircleLine,
  RiStethoscopeLine,
  RiUserLine,
} from 'react-icons/ri';
import {
  MdListAlt,
  MdOutlineAttachMoney,
  MdOutlineCampaign,
  MdOutlineChat,
  MdOutlineInventory2,
  MdOutlineReviews,
  MdOutlineTextsms,
} from 'react-icons/md';
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
      name: 'Pending',
    },
    {
      id: 3,
      name: 'Approved',
    },
    {
      id: 4,
      name: 'Cancelled',
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
