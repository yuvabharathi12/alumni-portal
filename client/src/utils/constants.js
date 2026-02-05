export const COLLEGE_NAME = "C Abdul Hakeem College of Engineering and Technology (CAHCET)";

export const DEPARTMENTS = [
  "Computer Science and Engineering",
  "Electronics and Communication Engineering",
  "Electrical and Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Information Technology",
];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const BATCH_YEARS = Array.from({ length: 30 }, (_, i) => 
  new Date().getFullYear() - i
).map(year => ({ label: year.toString(), value: year }));

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];

export const EXPERIENCE_LEVELS = ["Entry Level", "Mid-Level", "Senior", "Executive", "Any"];
