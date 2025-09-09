//1 
public void handleStudentData() {
    readFile();
    parseData();
    validate();
    calculateStatistics();
    generateReport();
    sendEmail();
}

public void handleStudentData() {
    List<Student> students = studentService.loadAndValidate();
    Report report = reportService.generate(students);
    emailService.send(report);
}

//2
if (student.getAge() > 18) {
    System.out.println("Adult");
}
if (teacher.getAge() > 18) {
    System.out.println("Adult");
}

public void printIfAdult(Person person) {
    if (person.getAge() > 18) {
        System.out.println("Adult");
    }
}

//3
public void do() {}
public void calculateAverageGrade() {}

//4
int a = student.getAge();
int b = a + 5;
System.out.println(b);

System.out.println(student.getAge() + 5);

//5
EmailSender sender = new EmailSender();
sender.send(email);

NotificationService service = new EmailNotificationService();
service.send(email);

//6
public void loadStudents() {
    List<Student> students = new ArrayList<>();
    while (true) {
        students.add(new Student()); 
    }
}

public void loadStudentsSafely(InputStream input) {
    List<Student> students = new ArrayList<>();
    try (BufferedReader reader = new BufferedReader(new InputStreamReader(input))) {
        String line;
        while ((line = reader.readLine()) != null) {
            if (students.size() >= 1000) break; // ограничение по размеру
            students.add(parseStudent(line));
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}


//7
for (Student s : students) {
    for (Course c : courses) {
        if (s.hasCourse(c)) { ... }
    }
}

Set<Course> courseSet = new HashSet<>(courses);
for (Student s : students) {
    for (Course c : s.getCourses()) {
        if (courseSet.contains(c)) { ... }
    }
}

//8
public double calculateBonus(double salary) {
    return salary * 0.15; 
}

public class BonusCalculator {
    private static final double BONUS_RATE = 0.15;

    public double calculateBonus(double salary) {
        return salary * BONUS_RATE;
    }
}








