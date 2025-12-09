# **Программное средство учёта расчётов со студентами-стипендиатами в учреждениях высшего образования**

Краткое описание проекта, его цели и основные возможности

Ссылки на репозитории сервера и клиента

---

## **Содержание**

1. [Архитектура](#Архитектура)
	1. [C4-модель](#C4-модель)
	2. [Схема данных](#Схема_данных)
2. [Функциональные возможности](#Функциональные_возможности)
	1. [Диаграмма вариантов использования(#Диаграмма_вариантов_использования)]
	2. [User-flow диаграммы](#User-flow_диаграммы)
3. [Детали реализации](#Детали_реализации)
	1. [UML-диаграммы](#UML-диаграммы)
	2. [Спецификация API](#Спецификация_API)
	3. [Безопасность](#Безопасность)
	4. [Оценка качества кода](#Оценка_качества_кода)
4. [Тестирование](#Тестирование)
	1. [Unit-тесты](#Unit-тесты)
	2. [Интеграционные тесты](#Интеграционные_тесты)
5. [Установка и  запуск](#installation)
	1. [Манифесты для сборки docker образов](#Манифесты_для_сборки_docker_образов)
	2. [Манифесты для развертывания k8s кластера](#Манифесты_для_развертывания_k8s_кластера)
6. [Лицензия](#Лицензия)
7. [Контакты](#Контакты)
8. [Пользовательский интерфейс](#Пользовательский интерфейс)

---
## **Архитектура**

### C4-модель

Контейнерный уровень архитектуры программного средства представлен на рисунке 1.

<img width="903" height="761" alt="image" src="https://github.com/user-attachments/assets/d4e7451e-374d-4d79-91c0-90bedbd086b6" />

Рисунок 1 – Контейнерный уровень архитектуры программного средства 

В центре системы учёта расчётов со студентами-стипендиатами находится веб-приложение, разработанное с использованием JavaScript и Angular. Оно предоставляет удобный интерфейс для студентов, бухгалтеров и сотрудников деканата. 
Для обработки запросов от веб-приложения используется серверное API-приложение, реализованное на Java с применением Spring Boot и Spring MVC. Оно обеспечивает доступ к функциональности системы через REST API, включая расчёт размеров стипендий, проверку наличия льгот, генерацию отчётности и регистрацию действий пользователей. API-приложение взаимодействует с базой данных, получая и обрабатывая данные через контроллеры и сервисные компоненты.
Хранилищем данных служит база данных, реализованная на MySQL. В ней сохраняется информация о студентах, документах, расчётах, льготах и типах стипендий. База данных обеспечивает надёжное хранение, чтение и обновление информации, необходимой для корректной работы API-приложения и формирования отчётности.
Компонентный уровень архитектуры программного средства представлен на рисунке 2.

<img width="943" height="765" alt="image" src="https://github.com/user-attachments/assets/464542af-e402-489c-9999-6ef9b35b4318" />


Рисунок 2 – Компонентный уровень архитектуры программного средства 

Контейнер с API-приложением был детализирован на уровне компонентов – контроллеров, каждый из которых отвечает за отдельную функциональность системы. Веб-приложение, разработанное с использованием JavaScript и Angular, взаимодействует с каждым контроллером через REST API.
Контроллер студентов (Student Controller) управляет данными о студентах, включая их личную информацию, академические показатели, наличие пересдач и право на льготы. Он связан с базой данных, из которой извлекает и обновляет сведения о студентах.
Контроллер документов (Documentation Controller) отвечает за создание и хранение документов по выплатам, необходимых для бухгалтерии. 
Контроллер расчётов (Calculation Controller) реализует логику вычисления размера стипендии на основе академических показателей и наличия льгот. Он получает входные данные от контроллера студентов и стипендий, производит расчёты и сохраняет результаты в базе данных.
Контроллер стипендий (Award Controller) управляет типами стипендий и их размерами. Он предоставляет информацию для расчётов и отображения в интерфейсе пользователя.
Контроллер безопасности (Security Controller), реализованный с использованием Spring Security, отвечает за регистрацию и авторизацию пользователей, обеспечивая доступ к функциональности системы только для зарегистрированных и проверенных ролей — студентов, бухгалтеров и сотрудников деканата.
Вся информация о студентах, документах, расчётах и типах стипендий хранится в базе данных, реализованной на MySQL. База данных обеспечивает надёжное хранение и доступ к данным для всех компонентов API-приложения.
Кодовый уровень архитектуры программного средства представлен на рисунке 3.

<img width="943" height="961" alt="image" src="https://github.com/user-attachments/assets/c07e3ab5-9e67-4bb9-8170-0c55af1a0982" />

Рисунок 3 – Кодовый уровень архитектуры программного средства 
Кодовый уровень архитектуры программного средства учёта расчётов со студентами-стипендиатами отражает структуру классов, реализующих бизнес-логику системы. В центре модели находится класс Student, содержащий ключевые атрибуты: ФИО, логин, пароль, средний балл, количество часов пропусков, наличие пересдач и тип льготы. Этот класс связан с классами Documents и Calculation, что позволяет отслеживать документы, подтверждающие право на стипендию, и проводить расчёты выплат.
Класс Documents хранит информацию о типе и названии документа, а также содержит ссылки на студента и результат расчёта. Класс Calculation реализует логику вычисления суммы стипендии, учитывая дату расчёта, академические показатели студента и применяемые льготы. Он зависит от классов Benefits и Award, которые описывают типы льгот и базовые размеры стипендий соответственно.


### Схема данных

Описание отношений и структур данных, используемых в ПС. Также представить скрипт (программный код), который необходим для генерации БД

![image](https://github.com/user-attachments/assets/85530447-a137-4cdd-b5a8-e75c47125793)

---

## **Функциональные возможности**

### Диаграмма вариантов использования

Диаграмма вариантов использования и ее описание

### User-flow диаграммы
User-flow для студента

<img width="1820" height="750" alt="image" src="https://github.com/user-attachments/assets/51a37ff7-c36f-4df4-9228-bce88adfd774" />

User-flow для преподавателя

<img width="1834" height="728" alt="image" src="https://github.com/user-attachments/assets/1ddd6e94-2a04-474f-bf65-98b45b0e6555" />

User-flow для бухгалтера

<img width="1832" height="605" alt="image" src="https://github.com/user-attachments/assets/4d8bb0a4-940e-49cf-b19d-1c96fdad08c1" />

---

## **Детали реализации**

### UML-диаграммы


<img width="5023" height="4301" alt="uml-png-StudentPay1" src="https://github.com/user-attachments/assets/3ffc1165-c005-4518-ae34-6ed95cb78032" />


<img width="298" height="591" alt="image" src="https://github.com/user-attachments/assets/4cfb3503-1b05-4ee0-b402-93fade869f97" />



<img width="974" height="918" alt="image" src="https://github.com/user-attachments/assets/f346acc0-3d5f-4ad3-8d20-4890571f5d8a" />



<img width="878" height="560" alt="image" src="https://github.com/user-attachments/assets/119c93df-fa4b-4360-8ddf-f48f21204b3f" />



<img width="523" height="752" alt="image" src="https://github.com/user-attachments/assets/9993657b-a4e9-4dd7-a40f-45a343402302" />

### Спецификация API

Представить описание реализованных функциональных возможностей ПС с использованием Open API (можно представить либо полный файл спецификации, либо ссылку на него)

### Безопасность

1 РЕАЛИЗАЦИЯ АУТЕНТИФИКАЦИИ 
   И АВТОРИЗАЦИИ ПОЛЬЗОВАТЕЛЕЙ

Для реализации аутентификации и авторизации в программной системе была использована Spring Security в сочетании с JWT (JSON Web Token).
JWT применяется для бессессионной аутентификации, при которой каждая клиентская сессия подтверждается уникальным токеном, содержащим имя пользователя и роли.
Это позволяет полностью отказаться от хранения сессий на сервере (архитектура RESTful API остаётся stateless).
Использованные сторонние компоненты:
1 Spring Security – обеспечивает инфраструктуру аутентификации, авторизации и защиты маршрутов. Подключается как зависимость spring-boot-starter-security.
2 JJWT (io.jsonwebtoken) – библиотека для генерации и валидации JWT-токенов. Используется для подписи токенов алгоритмом HMAC-SHA256.
3 Lombok – для автоматической генерации конструкторов и логирования (@Slf4j, @RequiredArgsConstructor).

Конфигурация безопасности: основная настройка безопасности реализована в классе SecurityConfig.
Пояснение:
1 CSRF отключен, так как используется токеновая аутентификация.
2 CORS включен для поддержки запросов с фронтенда.
3 SessionCreationPolicy.STATELESS – сессии не создаются, вся информация об аутентификации хранится в JWT.
4 JwtRequestFilter добавлен перед стандартным фильтром UsernamePasswordAuthenticationFilter – он извлекает и проверяет JWT из заголовка Authorization.

@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@Configuration
public class SecurityConfig {
    private final UserService userService;
    private final JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(request -> {
                var corsConfiguration = new CorsConfiguration();
                corsConfiguration.setAllowedOriginPatterns(List.of("*"));
                corsConfiguration.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
                corsConfiguration.setAllowedHeaders(List.of("*"));
                corsConfiguration.setAllowCredentials(true);
                return corsConfiguration;
            }))
            .authorizeHttpRequests(auth -> auth
                // Открытые эндпоинты
                .requestMatchers("/auth", "/registration").permitAll()
                // Защищённые маршруты
                .requestMatchers("/payments/**", "/students/**", "/applications/**").authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(ex -> ex.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}

Фильтрация и проверка JWT: Фильтр JwtRequestFilter выполняет анализ каждого входящего запроса.
Пояснение:
1 Извлекает токен из заголовка Authorization.
2 Проверяет подпись токена и срок его действия.
3 Устанавливает контекст безопасности, добавляя роли пользователя.

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {

    private final JwtTokenUtils jwtTokenUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            String username = jwtTokenUtils.getUsername(jwt);

            List<String> roles = jwtTokenUtils.getRoles(jwt);
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                username, null,
                roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList())
            );
            SecurityContextHolder.getContext().setAuthentication(token);
        }
        chain.doFilter(request, response);
    }
}

Генерация и валидация токенов JWT: Класс JwtTokenUtils отвечает за создание, подпись и верификацию JWT.
Токен включает: имя пользователя, список ролей, время жизни токена.
Для подписи используется алгоритм HS256 и секретный ключ из application.properties.

@Component
@Slf4j
public class JwtTokenUtils {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.lifetime}")
    private Duration jwtLifetime;

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        List<String> rolesList = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        claims.put("roles", rolesList);

        Date issuedDate = new Date();
        Date expiredDate = new Date(issuedDate.getTime() + jwtLifetime.toMillis());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(issuedDate)
                .setExpiration(expiredDate)
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUsername(String token) {
        return getAllClaimsFromToken(token).getSubject();
    }

    public List<String> getRoles(String token) {
        return getAllClaimsFromToken(token).get("roles", List.class);
    }
}

Логика аутентификации и регистрации пользователей: контроллер AuthController предоставляет REST-эндпоинты.

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/auth")
    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest authRequest) {
        return authService.createAuthToken(authRequest);
    }
    @PostMapping("/registration")
    public ResponseEntity<?> createNewUser(@RequestBody RegistrationUserDTO registrationUserDTO) {
        return authService.createNewUser(registrationUserDTO);
    }
}

Метод createAuthToken() вызывает AuthService.createAuthToken() — при успешной проверке логина и пароля формируется JWT-токен:

public ResponseEntity<?> createAuthToken(JwtRequest authRequest) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
    );
    User user = userRepository.findByUsername(authRequest.getUsername())
        .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
    UserDetails userDetails = loadUserByUsername(authRequest.getUsername());
    String token = jwtTokenUtils.generateToken(userDetails);
    List<String> roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toList());
    return ResponseEntity.ok(new JwtResponse(token, roles));
}


2 МЕХАНИЗМЫ ОБЕСПЕЧЕНИЯ БЕЗОПАСНОСТИ   ДАННЫХ

Механизмы обеспечения безопасности данных:
1 Хэширование паролей.
Для хранения паролей используется BCryptPasswordEncoder:
@Bean
public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}

2 JWT-подпись и срок действия токена.
Каждый токен подписывается секретным ключом и имеет ограниченное время жизни (параметр jwt.lifetime).
3 Система ролей и разграничение доступа
В JWT включаются роли (админ, студент и бухгалтер), которые проверяются при обращении к защищённым эндпоинтам.
4 CORS и HTTPS.
Конфигурация CORS позволяет безопасно обращаться к API из разных доменов.


### Оценка качества кода

Используя показатели качества и метрики кода, оценить его качество

---

## **Тестирование**

### Unit-тесты


class StipendServiceTest {

    @Mock
    private StipendRepository stipendRepository;

    @Mock
    private StipendSettingsRepository stipendSettingsRepository;

    @InjectMocks
    private StipendService stipendService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // ------------------------------------------------------------
    // 1. getAllStipends()
    // ------------------------------------------------------------
    @Test
    void testGetAllStipends() {
        List<Stipend> expectedStipends = Arrays.asList(new Stipend(), new Stipend());
        when(stipendRepository.findAll()).thenReturn(expectedStipends);

        List<Stipend> result = stipendService.getAllStipends();

        assertEquals(2, result.size());
        verify(stipendRepository, times(1)).findAll();
    }

    // ------------------------------------------------------------
    // 2. getStipendSettings()
    // ------------------------------------------------------------
    @Test
    void testGetStipendSettings() {
        StipendSettings settings = new StipendSettings();
        when(stipendSettingsRepository.findById(1L)).thenReturn(Optional.of(settings));

        Optional<StipendSettings> result = stipendService.getStipendSettings();

        assertTrue(result.isPresent());
        assertEquals(settings, result.get());
        verify(stipendSettingsRepository, times(1)).findById(1L);
    }

    // ------------------------------------------------------------
    // 3. updateStipendSettings()
    // ------------------------------------------------------------
    @Test
    void testUpdateStipendSettings_Existing() {
        StipendSettings existing = new StipendSettings();
        existing.setProfkomDeductionPercent(5.0);
        existing.setBrsmDeductionPercent(3.0);

        StipendSettings newSettings = new StipendSettings();
        newSettings.setProfkomDeductionPercent(10.0);
        newSettings.setBrsmDeductionPercent(7.0);

        when(stipendSettingsRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(stipendSettingsRepository.save(existing)).thenReturn(existing);

        StipendSettings result = stipendService.updateStipendSettings(newSettings);

        assertEquals(10.0, result.getProfkomDeductionPercent());
        assertEquals(7.0, result.getBrsmDeductionPercent());
        verify(stipendSettingsRepository).save(existing);
    }

    @Test
    void testUpdateStipendSettings_NoExisting() {
        StipendSettings newSettings = new StipendSettings();
        newSettings.setProfkomDeductionPercent(12.0);
        newSettings.setBrsmDeductionPercent(8.0);

        StipendSettings newCreated = new StipendSettings();
        when(stipendSettingsRepository.findById(1L)).thenReturn(Optional.empty());
        when(stipendSettingsRepository.save(any(StipendSettings.class))).thenReturn(newCreated);

        StipendSettings result = stipendService.updateStipendSettings(newSettings);

        verify(stipendSettingsRepository).save(any(StipendSettings.class));
    }

    // ------------------------------------------------------------
    // 4. updateStipendAmount()
    // ------------------------------------------------------------
    @Test
    void testUpdateStipendAmount() {
        Stipend stipend = new Stipend();
        stipend.setAmount(200.0);

        when(stipendRepository.findById(1L)).thenReturn(Optional.of(stipend));
        when(stipendRepository.save(stipend)).thenReturn(stipend);

        Optional<Stipend> result = stipendService.updateStipendAmount(1L, 300.0);

        assertTrue(result.isPresent());
        assertEquals(300.0, result.get().getAmount());
        verify(stipendRepository).save(stipend);
    }

    @Test
    void testUpdateStipendAmount_NotFound() {
        when(stipendRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Stipend> result = stipendService.updateStipendAmount(1L, 500.0);

        assertFalse(result.isPresent());
        verify(stipendRepository, never()).save(any());
    }

    // ------------------------------------------------------------
    // 5. findByTypeName()
    // ------------------------------------------------------------
    @Test
    void testFindByTypeName() {
        Stipend stipend = new Stipend();
        when(stipendRepository.findByTypeName("academic")).thenReturn(Optional.of(stipend));

        Optional<Stipend> result = stipendService.findByTypeName("academic");

        assertTrue(result.isPresent());
        verify(stipendRepository).findByTypeName("academic");
    }
}
Перед выполнением тестов создаются заглушки (@Mock) для репозиториев StipendRepository и StipendSettingsRepository. Сервис StipendService инициализируется с использованием аннотации @InjectMocks, что позволяет автоматически внедрить созданные mock-объекты вместо реальных зависимостей. Метод MockitoAnnotations.openMocks() в секции @BeforeEach подготавливает тестовое окружение перед запуском каждого теста.
Тестирование охватывает пять основных методов сервиса:
1 Тестирование метода getAllStipends().
Проверяется, что сервис корректно возвращает список стипендий. С помощью Mockito задаётся поведение репозитория findAll(), после чего выполняется вызов сервиса, и проводится проверка количества элементов и факта обращения к репозиторию.
2 Тестирование метода getStipendSettings().
Задаётся поведение репозитория при поиске настроек по идентификатору 1. Тест подтверждает, что сервис корректно возвращает Optional c ожидаемым объектом и вызывает метод репозитория один раз.
3 Тестирование метода updateStipendSettings().
Проверяются два независимых сценария: настройки существуют в базе и настройки отсутствуют и создаются заново.
В первом случае тест проверяет, что поля объекта обновляются новыми значениями, а затем сохраняются через репозиторий. Во втором – что при отсутствии данных сервис создаёт новый объект и передаёт его в метод save().
4 Тестирование метода updateStipendAmount().
Метод должен изменять размер стипендии по её идентификатору.
Проверяются два варианта: запись найдена – значение поля корректно обновляется, вызывается сохранение; запись отсутствует – сервис возвращает Optional.empty(), сохранение не выполняется.
5 Тестирование метода findByTypeName().
Проверяется, что сервис корректно передаёт аргумент в репозиторий и возвращает Optional с найденной записью.


### Интеграционные тесты

@Test
void testGetAllBenefits_ShouldReturnOk() throws Exception {
    Benefit benefit1 = new Benefit();
    benefit1.setName("Benefit 1");
    benefit1.setDescription("Description 1");

    Benefit benefit2 = new Benefit();
    benefit2.setName("Benefit 2");
    benefit2.setDescription("Description 2");

    benefitRepository.save(benefit1);
    benefitRepository.save(benefit2);

    mockMvc.perform(get("/benefits"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$[0].name").value("Benefit 1"))
            .andExpect(jsonPath("$[1].name").value("Benefit 2"));
}


Описание кода: в данном интеграционном тесте мы создаем две премии, сохраняем их в «замоканную» базу данных, затем делаем запрос на получение данных о премиях и проверяем, совпали ли значения.
Пример модульного тестирования:

@Test
void getAllBenefits_ShouldReturnAllBenefits() {
    Benefit benefit1 = new Benefit();
    Benefit benefit2 = new Benefit();
    when(benefitRepository.findAll()).thenReturn(List.of(benefit1, benefit2));

    List<Benefit> result = benefitService.getAllBenefits();

    assertNotNull(result);
    assertEquals(2, result.size());
    verify(benefitRepository, times(1)).findAll();
}

Данный тест представляет собой интеграционные тесты для контроллера BenefitService. 

Описание Unit-теста: в данном Unit-тесте мы создаем две заглушки Премии и просим вернуть полный список премий. Затем проверяем, какое количество премий вернулось нам и совпадает ли оно с записанным.


## **Установка и  запуск**

1 ИНСТРУКЦИЯ ПО РАЗВЕРТЫВАНИЮ 
   БЭКЕНД-ЧАСТИ ПС

Инструкция состоит из нескольких пунктов:
1 Подготовка окружения. 
Установка необходимых инструментов. Для развертывания бэкенд-части программного средства необходимо установить:
– среду разработки IntelliJ IDEA;
– СУБД PostgreSQL;
– Архив проекта, который необходимо скачать, распаковать и открыть в IntelliJ IDEA.
2 Настройка базы данных.
Создание базы данных.
В СУБД PostgreSQL требуется создать новую базу данных с нужным именем, например, project. Имя пользователя и пароль должны быть заданы корректно.
Настройка подключения в проекте.
В конфигурационном файле application.properties необходимо указать параметры доступа к базе данных:

spring.datasource.username=...
spring.datasource.password=...
spring.datasource.url=jdbc:postgresql://localhost:8080/project

3 Настройка директорий файлов.
На диске D: создать папку project_images. Внутри неё создать поддиректорию images. Путь к данным директориям указан в конфигурации – при изменении названий необходимо обновить их в application.properties.
4	Подключение базы данных в IntelliJ IDEA.
Для удобства возможно настроить подключение к базе данных в IntelliJ IDEA:
– открыть вкладку Database;
– выбрать «+ → Data Source → PostgreSQL»;
– указать параметры доступа к БД;
– выполнить проверку соединения (Test Connection);
– при успешном подключении сохранить конфигурацию (Apply → OK);
– после этого станет доступна структура базы данных в панели Database.

2 ИНСТРУКЦИЯ ПО РАЗВЕРТЫВАНИЮ 
   ФРОНТЕНД-ЧАСТИ ПС

Инструкция состоит из нескольких пунктов:
1 Подготовка окружения.
Установка Node.js. Для работы фронтенд-части необходимо установить платформу Node.js версии 16: 
– скачать архив с Node.js (версия 16);
– выполнить установку;
– перезагрузить компьютер для применения изменений.
2	Подготовка проекта.
Открыть папку frontend программного средства в среде разработки IntelliJ IDEA. В нижней части интерфейса открыть вкладку Terminal.
Установка необходимых пакетов. В терминале последовательно выполнить команды:

npm install -g @angular/cli@14
npm install npm@8

В процессе выполнения могут появляться информационные сообщения и предупреждения (warnings). Это является нормальным, если не возникают ошибки (errors). При появлении ошибок необходимо остановить процесс и устранить их.
3 Запуск фронтенд-части:
– запуск через терминал;
Для запуска проекта выполнить команду:

ng serve

После появления сообщения «Compiled successfully» фронтенд будет доступен по адресу: http://localhost:4200.
– альтернативный способ запуска;
В последующих запусках проект можно запускать через встроенную кнопку Run/Play в IntelliJ IDEA.



3 ЗАПУСК ПРОЕКТА 

Инструкция состоит из нескольких пунктов:
1 Предварительные требования.
Перед запуском необходимо выполнить все шаги по развертыванию бэкенд- и фронтенд-частей программного средства согласно соответствующим инструкциям.
Для корректного функционирования системы требуется одновременный запуск обеих частей: серверной и клиентской.
2	Запуск бэкенд-части. 
Нужно открыть проект в IntelliJ IDEA и выполнить запуск серверной части через встроенные средства среды разработки (кнопка Run/Play).
Бэкенд должен работать непрерывно на протяжении всего времени работы фронтенда.
3 Запуск фронтенд-части.
Запуск через терминал:
– открыть папку фронтенда в IntelliJ IDEA;
– перейти во вкладку Terminal;
– выполнить команду:

ng serve

Запуск через IntelliJ IDEA: в качестве альтернативы можно использовать кнопку Run/Play в IDE для запуска Angular-приложения.
4 Доступ к системе.
После успешного запуска в терминале должно появиться сообщение «Compiled successfully». Клиентская часть системы будет доступна по адресу: http://localhost:4200.
5 Требования к совместной работе компонентов.
Бэкенд и фронтенд должны быть запущены одновременно.
Отключение одного из компонентов приведёт к невозможности использования программного средства.


---

## **Лицензия**

Этот проект лицензирован по лицензии MIT - подробности представлены в файле [[License.md|LICENSE.md]]

---

## **Контакты**

Автор: email

## **Пользовательский интерфейс**



<img width="867" height="413" alt="image" src="https://github.com/user-attachments/assets/cf6641c0-3ffb-4b2c-812c-326c4abcf8b3" />

<img width="864" height="413" alt="image" src="https://github.com/user-attachments/assets/a62bf564-95d6-480f-89ae-e1d3c192d7a2" />

<img width="876" height="413" alt="image" src="https://github.com/user-attachments/assets/a4b57715-c541-401d-b065-4df3b63affd1" />


<img width="876" height="414" alt="image" src="https://github.com/user-attachments/assets/e57b8a38-e3b1-490c-a2a8-a3c2b487fc67" />

<img width="874" height="413" alt="image" src="https://github.com/user-attachments/assets/12b28d39-708c-433d-9fc9-ce2e2471cb23" />

<img width="867" height="414" alt="image" src="https://github.com/user-attachments/assets/1fa65c60-6723-4e2b-b012-2627955700f5" />

<img width="872" height="413" alt="image" src="https://github.com/user-attachments/assets/ee008e0e-507f-4a1b-a363-122ea0a5ae71" />






