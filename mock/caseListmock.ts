import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { parse } from 'url';


const caseListDataSource = [
  {
    obNumber: "G817",
    incidentDateTime: "2024-10-01 14:30",
    station: "Central Police Station",
    complainantName: "John Doe",
    complainantIdNumber: "123456789",
    complainantPhoneNumber: "0712345678",
    respondentsIdNumber: "28473629",
    respondentsPhoneNumber: "0723456789",
    caseType: "Robbery",
    severity: "High",
    caseStatus: "Open",
    description: "A group of three individuals robbed a shop at the Central Market. Witnesses have identified the suspects."
  },
  {
    obNumber: "K3872",
    incidentDateTime: "2024-10-02 11:15",
    station: "Kamukunji Police Station",
    complainantName: "Jane Smith",
    complainantIdNumber: "987654321",
    complainantPhoneNumber: "0734567890",
    respondentsIdNumber: "19483726",
    respondentsPhoneNumber: "0734567890",
    caseType: "Assault",
    severity: "Medium",
    caseStatus: "Open",
    description: "A physical altercation between two individuals escalated, leading to one being hospitalized."
  },
  {
    obNumber: "G5161",
    incidentDateTime: "2024-09-30 03:00",
    station: "Industrial Area Police Station",
    complainantName: "Mike Johnson",
    complainantIdNumber: "112233445",
    complainantPhoneNumber: "0711332233",
    respondentsIdNumber: "38475621",
    respondentsPhoneNumber: "0711223344",
    caseType: "Burglary",
    severity: "High",
    caseStatus: "Open",
    description: "A warehouse was broken into during the night, and electronics worth over $10,000 were stolen."
  },
  {
    obNumber: "K5267",
    incidentDateTime: "2024-10-03 08:45",
    station: "Traffic Police Station",
    complainantName: "Sarah Connor",
    complainantIdNumber: "556677889",
    complainantPhoneNumber: "0722334455",
    respondentsIdNumber: "49382746",
    respondentsPhoneNumber: "0722345678",
    caseType: "Traffic Violation",
    severity: "Low",
    caseStatus: "Open",
    description: "A public vehicle was caught speeding and ignoring traffic lights at a major intersection."
  },
  {
    obNumber: "G8923",
    incidentDateTime: "2024-09-29 21:30",
    station: "Muthaiga Police Station",
    complainantName: "Alice White",
    complainantIdNumber: "998877665",
    complainantPhoneNumber: "0733344556",
    respondentsIdNumber: "56473829",
    respondentsPhoneNumber: "0733344556",
    caseType: "Domestic Violence",
    severity: "Medium",
    caseStatus: "Open",
    description: "A domestic dispute between a couple resulted in injuries to both parties."
  },
  {
    obNumber: "G6127",
    incidentDateTime: "2024-09-28 16:00",
    station: "Nairobi Central Station",
    complainantName: "Officer Alex",
    complainantIdNumber: "001122334",
    complainantPhoneNumber: "0700123456",
    respondentsIdNumber: "12345678",
    respondentsPhoneNumber: "0712345678",
    caseType: "Drug Trafficking",
    severity: "High",
    caseStatus: "Pending",
    description: "A suspect was caught with illegal narcotics at a checkpoint. The drugs were hidden inside a vehicle."
  },
  {
    obNumber: "G72378",
    incidentDateTime: "2024-10-04 18:10",
    station: "Westlands Police Station",
    complainantName: "Tom Green",
    complainantIdNumber: "334455667",
    complainantPhoneNumber: "0722765432",
    respondentsIdNumber: "93746529",
    respondentsPhoneNumber: "0722765432",
    caseType: "Hit and Run",
    severity: "High",
    caseStatus: "Open",
    description: "A pedestrian was hit by a speeding car, and the driver fled the scene without providing assistance."
  },
  {
    obNumber: "K78237",
    incidentDateTime: "2024-09-25 12:00",
    station: "Lang'ata Police Station",
    complainantName: "Community Report",
    complainantIdNumber: "223344556",
    complainantPhoneNumber: "0734455667",
    respondentsIdNumber: "87654321",
    respondentsPhoneNumber: "0734455667",
    caseType: "Vandalism",
    severity: "Medium",
    caseStatus: "Complete",
    description: "Streetlights and public benches were vandalized in the Lang'ata area by unidentified individuals."
  }
];


function getCaseList(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;

  let dataSource = [...caseListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  const result = {
    data: dataSource,
    total: caseListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${current}`, 10) || 1,
  };

  return res.json(result);
}

function postCase(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, titleName, caseType, station, respondentsIdNumber, primaryPhoneNumber, description } = body;

  switch (method) {
    case 'post':
      (() => {
        const newCase = {
          id: caseListDataSource.length + 1, // Increment id based on length
          projectCode: "NEW",
          titleName,
          station,
          caseType,
          respondentsIdNumber,
          primaryPhoneNumber,
          description,
          createdAt: dayjs().format('YYYY-MM-DD'),
          updatedAt: dayjs().format('YYYY-MM-DD'),
        };
        caseListDataSource.push(newCase);
        return res.json(newCase);
      })();
      return;

    case 'delete':
      // Handle delete logic if needed
      break;

    default:
      break;
  }

  const result = {
    list: caseListDataSource,
    pagination: {
      total: caseListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/cases': getCaseList,
  'POST /api/cases': postCase,
};
