export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export type BasicListItemDataType = {
  id: string;
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
};

export type DocumenyType = {
  id: string;
  createdAt:number;
  name:string;
  description: string;
  status: 'Pending'|'Approved'|'Rejected';
  documentType:'Confidential' | 'Normal';
  viewedAt:number;
  viewedBy:string;
  url:string;
}
