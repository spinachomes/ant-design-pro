// @ts-ignore
/* eslint-disable */
declare namespace Person {
  type UserInfo = {
    phoneNum: string;
    userName: string;
    userId: number;
    picId?: number;
    roles?: string[];
    permissions?: string[];
  };
  type CampUser = API.BaseForm & {
    password: string;
    name: string;
    idCard: string;
    birthday: string;
    education: string;
    phoneNum: string;
    gender: string;
    post: string;
    postLevel: string;
    enabled?: boolean;
  };
  type CampPolice = API.CampUser & {
    policeNo: string;
    deptId: string;
    secondDeptId: string;
    deptIds: string[];
    workDate: string;
    pictures: number[];
    personalIntroduction: string;
    createdBy: number;
    lastModifiedBy: number;
    roleIds: number[];
  };
  type CampPoliceQuery = API.BaseQuery & {
    username?: string;
    name?: string;
    deptId?: string;
    postCodes?: string[];
    roleIds?: number[];
  };

  type CampStudent = API.CampUser & {
    unitName: string;
    nation: string;
    politicalStatus: string;
    joinDate: string;
    nativePlace: string;
    school: string;
    homeAddress: string;
    homeTel: string;
    maritalStatus: string;
    interests: string;
    remark: string;
    pictures: number[];
  };

  type CampStudentQuery = API.BaseQuery;
}
