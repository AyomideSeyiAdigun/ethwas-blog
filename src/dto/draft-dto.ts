export default class DraftDto{
  id!:number;
  title!:string;
  content!:string;
  status:'ACTIVE'|'DEACTIVATED'='ACTIVE';
  userId!:number;
  keywords!:string;
  summary!:string;
}

