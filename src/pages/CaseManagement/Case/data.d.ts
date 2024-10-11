export type caseData = {
id:number,
projectCode: string,
titleName:string,
station:string,
caseType:string,
respondentsIdNumber:string,
primaryPhoneNumber:string,
description:string,
};

export type caseResponse = {
  data: caseData[];
  total: number;
  succcess: boolean;
  pageSize: number;
  current: number;
};