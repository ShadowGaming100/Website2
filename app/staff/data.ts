export type StaffJsonMember = {
  name?: string;
  roles: string[] | string;
  about?: string;
  links?: Record<string, string>;
};

export const staffData: Record<string, StaffJsonMember> = {
  shadow_gaming: {
    name: "Shadow Gaming",
    roles: ["Owner"],
    links: {
      github: "https://github.com/shadowgaming100",
    },
  },
  audi: {
    name: "Audi",
    roles: ["Administrator", "Developer", "Hosting Provider"],
  },
  luxxy: {
    name: "Luxxy",
    roles: ["Developer"],
  },
  zeph: {
    name: "Zeph",
    roles: ["Developer"],
  },
  simba: {
    name: "simba",
    roles: ["Developer"],
  },
  itsoffkey: {
    name: "itsoffkey",
    roles: ["Developer"],
  },
  quanglocle24: {
    name: "quanglocle24",
    roles: ["Developer"],
  },
  sahran: {
    name: "Sahran",
    roles: ["Helper"],
  },
  escherlol: {
    name: "Escherlol",
    roles: ["Helper"],
  },
  ym_50: {
    name: "YM_50",
    roles: ["Helper"],
  },
  royal: {
    name: "Royal",
    roles: ["Host Publisher", "Developer"],
  },
  pringels: {
    name: "Pringels",
    roles: ["Hosting Provider"],
  },
};
