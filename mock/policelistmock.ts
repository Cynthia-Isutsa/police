import { Request, Response } from 'express';

const policeStationListDataSource = [
  {
    id: 1,
    name: "Westlands Police Station",
    code: "WS-001",
    county: "Nairobi",
    subcounty: "Westlands",
    ward: "Kangemi",
    contactNumber: "0712345678",
    email: "westlands.ps@police.go.ke",
    address: "123 Westlands Road, Nairobi",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Lang'ata Police Station",
    code: "LN-002",
    county: "Nairobi",
    subcounty: "Lang'ata",
    ward: "Karen",
    contactNumber: "0723456789",
    email: "langata.ps@police.go.ke",
    address: "456 Lang'ata Rd, Nairobi",
    createdAt: "2024-02-10",
    updatedAt: "2024-02-10",
  },
  {
    id: 3,
    name: "Embakasi Police Station",
    code: "EB-003",
    county: "Nairobi",
    subcounty: "Embakasi",
    ward: "Utawala",
    contactNumber: "0734567890",
    email: "embakasi.ps@police.go.ke",
    address: "789 Embakasi Rd, Nairobi",
    createdAt: "2024-03-05",
    updatedAt: "2024-03-05",
  },
  {
    id: 4,
    name: "Likoni Police Station",
    code: "LK-004",
    county: "Mombasa",
    subcounty: "Likoni",
    ward: "Mtongwe",
    contactNumber: "0745678901",
    email: "likoni.ps@police.go.ke",
    address: "321 Likoni Rd, Mombasa",
    createdAt: "2024-04-01",
    updatedAt: "2024-04-01",
  },
  {
    id: 5,
    name: "Nakuru Central Police Station",
    code: "NC-005",
    county: "Nakuru",
    subcounty: "Nakuru Town East",
    ward: "Biashara",
    contactNumber: "0756789012",
    email: "nakuru.ps@police.go.ke",
    address: "654 Nakuru Town Rd, Nakuru",
    createdAt: "2024-05-15",
    updatedAt: "2024-05-15",
  },
  {
    id: 6,
    name: "Kisumu Central Police Station",
    code: "KC-006",
    county: "Kisumu",
    subcounty: "Kisumu Central",
    ward: "Market Ward",
    contactNumber: "0767890123",
    email: "kisumu.ps@police.go.ke",
    address: "987 Kisumu Rd, Kisumu",
    createdAt: "2024-06-20",
    updatedAt: "2024-06-20",
  },
  {
    id: 7,
    name: "Eldoret Central Police Station",
    code: "EC-007",
    county: "Eldoret",
    subcounty: "Kapseret",
    ward: "Racecourse",
    contactNumber: "0778901234",
    email: "eldoret.ps@police.go.ke",
    address: "321 Eldoret Rd, Eldoret",
    createdAt: "2024-07-25",
    updatedAt: "2024-07-25",
  },
];

// Function to get the list of police stations
function getPoliceStationList(req: Request, res: Response) {
  return res.json({
    data: policeStationListDataSource,
    success: true,
    total: policeStationListDataSource.length,
  });
}

// Function to post a new police station
function postPoliceStation(req: Request, res: Response) {
  const newStation = {
    id: policeStationListDataSource.length + 1, // Increment id based on length
    ...req.body,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  };

  policeStationListDataSource.push(newStation);
  return res.json({
    success: true,
    data: newStation,
  });
}

export default {
  'GET /api/policeStations': getPoliceStationList,
  'POST /api/policeStations': postPoliceStation,
};
