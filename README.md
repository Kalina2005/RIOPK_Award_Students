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


Диаграмма развертывания
<img width="298" height="591" alt="image" src="https://github.com/user-attachments/assets/4cfb3503-1b05-4ee0-b402-93fade869f97" />


Диаграмма деятельности
<img width="974" height="918" alt="image" src="https://github.com/user-attachments/assets/f346acc0-3d5f-4ad3-8d20-4890571f5d8a" />


Диаграмма вариантов использования
<img width="878" height="560" alt="image" src="https://github.com/user-attachments/assets/119c93df-fa4b-4360-8ddf-f48f21204b3f" />


Диаграмма состояний объекта
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

Представить код тестов для пяти методов и его пояснение

### Интеграционные тесты

Представить код тестов и его пояснение

---

## **Установка и  запуск**

### Манифесты для сборки docker образов

Представить весь код манифестов или ссылки на файлы с ними (при необходимости снабдить комментариями)

### Манифесты для развертывания k8s кластера

Представить весь код манифестов или ссылки на файлы с ними (при необходимости снабдить комментариями)

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






