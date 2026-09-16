export type EducationEntry = {
  id: string;
  degree: string;
  school: string;
  period: string;
  details: string;
};

export const education: EducationEntry[] = [
  {
    id: "sagar-institute",
    degree: "B.Tech in Computer Science",
    school: "Sagar Institute of Research and Technology, Bhopal, India",
    period: "Aug 2019 – June 2023",
    details:
      "Relevant Coursework: Object-Oriented Programming, Databases, Data Structures and Algorithms, Operating Systems, Computer Networks, Software Engineering.",
  },
];

export const certifications: string[] = [
  "Salesforce Certified Platform Developer I",
  "Salesforce Certified Advanced Administrator",
  "Salesforce Certified OmniStudio Developer",
];
