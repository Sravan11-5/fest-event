export interface Student {
  serialNo: number;
  timestamp: string;
  email: string;
  name: string;
  rollNo: string;
  dateOfJoining: string;
  assessmentCompleted: boolean;
  driveLink: string;
  driveFileId: string;
  /** Hypertext identifier: ROLLNO_XX_CERTIFICATE */
  certId: string;
  /** Direct-view Google Drive URL */
  viewUrl: string;
  /** Embeddable preview URL */
  previewUrl: string;
}

function extractFileId(driveUrl: string): string {
  const match = driveUrl.match(/[?&]id=([^&]+)/);
  return match ? match[1] : "";
}

function toCertId(rollNo: string, seq: number): string {
  const padded = String(seq).padStart(2, "0");
  return `${rollNo}_${padded}_CERTIFICATE`;
}

const rawData = [
  { timestamp:"02-02-2026 22:38", email:"havyamshp@gmail.com",           name:"Havyamsh Maruthai",                        rollNo:"24KN5A6107",   dateOfJoining:"12-06-2025", driveLink:"https://drive.google.com/open?id=1pBPmNMVrFEVM42xP-vpdfBla16bQtX7S" },
  { timestamp:"02-02-2026 22:55", email:"amruthaammu0082@gmail.com",      name:"Gandham Amrutha",                          rollNo:"24KN1A6132",   dateOfJoining:"01-04-2026", driveLink:"https://drive.google.com/open?id=1GcMGyPVgZun0iNJPNH7FATOz2ZJZf3qh" },
  { timestamp:"02-02-2026 22:55", email:"ks8897820@gmail.com",            name:"Nagurbee Shaik",                           rollNo:"23KN1A61B4",   dateOfJoining:"12-08-2025", driveLink:"https://drive.google.com/open?id=1ejhs5Cw8wlPpuY1ZVhvu-0yto74UzEte" },
  { timestamp:"02-10-2026 16:54", email:"tadikamallatripura@gmail.com",   name:"Tadikamalla Bala Tripura Sundari",         rollNo:"24KN1A61B9",   dateOfJoining:"12/28/2025", driveLink:"https://drive.google.com/open?id=1x7wq__dDrdwxf20Eh0jZeZaFB9hNeRwz" },
  { timestamp:"02-02-2026 23:12", email:"suhanakausar291@gmail.com",      name:"Mohammad Suhana Kausar",                   rollNo:"24KN1A6187",   dateOfJoining:"12/31/2025", driveLink:"https://drive.google.com/open?id=1vs0iiRFG4NbJbtgm7UQ8ftKptWsBfiHK" },
  { timestamp:"02-03-2026 06:03", email:"vijayakambhampati89@gmail.com",  name:"Kambhampati Vijaya Sri Vyshnavi Devi",     rollNo:"23KN1A6139",   dateOfJoining:"12-08-2025", driveLink:"https://drive.google.com/open?id=1s68qMsxS3glh739b59lfcoNpwzFEIqC0" },
  { timestamp:"02-03-2026 10:14", email:"yarlagaddachaitanya.24@gmail.com",name:"Yarlagadda Chaitanya",                    rollNo:"24KN1A61D1",   dateOfJoining:"12/29/2025", driveLink:"https://drive.google.com/open?id=1D9X9aI_M_ZAzMzHErTrGEMInskVmy9KU" },
  { timestamp:"02-03-2026 12:27", email:"gunjaparvathi3@gmail.com",       name:"Gunja Parvathi",                           rollNo:"24KN1A6138",   dateOfJoining:"12/27/2025", driveLink:"https://drive.google.com/open?id=1Pxj06K0puuK7xhXgyXiSgSEgZvAQP_vE" },
  { timestamp:"02-03-2026 12:27", email:"ramyasrigunduboyina@gmail.com",  name:"Gunduboyina Ramyasri",                     rollNo:"24KN1A6137",   dateOfJoining:"12/27/2025", driveLink:"https://drive.google.com/open?id=13wb9AUsaglpuEtpSanghcU7K_oVsAbuL" },
  { timestamp:"02-03-2026 13:09", email:"maradanisushma40@gmail.com",     name:"Maradani Sai Madhavi Sushma",              rollNo:"24KN1A6183",   dateOfJoining:"01-02-2026", driveLink:"https://drive.google.com/open?id=12XkSTjATFz3Sy2Ac1eq7b3Mhbknay7-4" },
  { timestamp:"02-03-2026 13:57", email:"logisajyoshithsai@gmail.com",    name:"Logisa G L V N Jyoshith Sai",             rollNo:"23KN1A6181",   dateOfJoining:"12-08-2025", driveLink:"https://drive.google.com/open?id=1Vgd38WaBRqjqHa7-ShntjFf5cTQqmTeA" },
  { timestamp:"02-03-2026 18:12", email:"satvikayeduresi@gmail.com",      name:"Yeduresi Satvika",                         rollNo:"24KN1A61D2",   dateOfJoining:"12/29/2025", driveLink:"https://drive.google.com/open?id=1zfYRvPzprWcdGhEstBVCqA_QZlaKEbVf" },
  { timestamp:"02-05-2026 09:27", email:"palaganisneha18@gmail.com",      name:"Palagani Soma Sneha Sri",                  rollNo:"24KN1A6193",   dateOfJoining:"12/30/2025", driveLink:"https://drive.google.com/open?id=1et2GZ0YdHJv8k6wOgSyc2rRpCLMs_Z-3" },
  { timestamp:"02-10-2026 16:51", email:"hemanaidu630@gmail.com",         name:"Kolagani Hema Vishnu Vardhani",            rollNo:"24KN1A6152",   dateOfJoining:"12/27/2025", driveLink:"https://drive.google.com/open?id=10fZWL3Sxt1bgo10yzrqUl9nzEty5GcmX" },
  { timestamp:"02-05-2026 21:59", email:"kotudurgaprasad586@gmail.com",   name:"Kotu Durgaprasad",                         rollNo:"24KN5A6105",   dateOfJoining:"01-05-2026", driveLink:"https://drive.google.com/open?id=1dHtXXHHmAeYmGj8W-qZ86Xi2uboAjIiO" },
  { timestamp:"02-05-2026 22:13", email:"nagalakshmivema555@gmail.com",   name:"Vema Nagalakshmi",                         rollNo:"23KN1A61C8",   dateOfJoining:"01-05-2026", driveLink:"https://drive.google.com/open?id=1M4fiBs2DwDKJpms7fQiHF7x4bfHQ1uNK" },
  { timestamp:"02-10-2026 16:56", email:"madhulathakolli5@gmail.com",     name:"Kolli Madhu Latha",                        rollNo:"24KN1A6154",   dateOfJoining:"01-05-2026", driveLink:"https://drive.google.com/open?id=1AZReUZxkpk15dizS2n6D5FE4HjOubeFc" },
];

export const students: Student[] = rawData.map((s, idx) => {
  const fileId  = extractFileId(s.driveLink);
  const seq     = idx + 1;
  return {
    serialNo:            seq,
    timestamp:           s.timestamp,
    email:               s.email,
    name:                s.name,
    rollNo:              s.rollNo,
    dateOfJoining:       s.dateOfJoining,
    assessmentCompleted: true,
    driveLink:           s.driveLink,
    driveFileId:         fileId,
    certId:              toCertId(s.rollNo, seq),
    viewUrl:             `https://drive.google.com/file/d/${fileId}/view?usp=sharing`,
    previewUrl:          `https://drive.google.com/file/d/${fileId}/preview`,
  };
});

export function getStudentByRollNo(rollNo: string): Student | undefined {
  return students.find(
    (s) => s.rollNo.toLowerCase() === rollNo.toLowerCase()
  );
}
