# About HTTP requests

## Типы HTTP-запросов и философия REST
---

### HTTP

HTTP - протокол, который описывает взаимодействие между двумя компьютерами (клиентом и сервером), построенное на базе сообщений, на ЗАПРОСЕ (Request) и ОТВЕТЕ (Response). 

Каждое сообщение состоит из трех частей: 
- стартовая строка (только это обязательная);
- заголовки; 
- тело. 

---

Стартовые строки для запроса и ответа имеют различный формат — нам интересна только стартовая строка запроса, которая выглядит так:

#### METHOD URI HTTP/VERSION

METHOD — это метод HTTP-запроса 
URI — идентификатор ресурса
VERSION — версия протокола (актуальная версия 1.1).
---

Заголовки — это набор пар имя-значение, разделенных двоеточием. 
В заголовках передается различная служебная информация:   
- кодировка сообщения
- название и версия браузера
- адрес, с которого пришел клиент (Referrer) 
- и т.д.

Тело сообщения — это, передаваемые данные. 
В ответе передаваемые данные = html-страница, которую запросил браузер, 
В запросе тело сообщения = содержимое файлов, загружаемых на сервер. 
Однако тело сообщения в запросе вообще отсутствует.


#### Пример HTTP-взаимодействия

> Запрос:
- GET /index.php HTTP/1.1
- Host: example.com
- User-Agent: Mozilla/5.0 (X11; U; Linux i686; ru; rv:1.9b5) - Gecko/2008050509 Firefox/3.0b5
- Accept: text/html
- Connection: close

Первая строка — это строка запроса
остальные — заголовки
тело сообщения отсутствует

> Ответ:
- HTTP/1.0 200 OK
- Server: nginx/0.6.31
- Content-Language: ru
- Content-Type: text/html; charset=utf-8
- Content-Length: 1234
- Connection: close

... САМА HTML-СТРАНИЦА ...
---

## Ресурсы и методы

**URI - Uniform Resource Identifier — единообразный** идентификатор ресурса. 

Ресурс — это файл на сервере (пример URI в данном случае '/styles.css'), также ресурс может быть какой-либо абстрактный объект ('/blogs/webdev/' — указывает на блок «Веб-разработка», а не на конкретный файл).

***Тип HTTP-запроса (HTTP-метод)*** указывает серверу на то, какое действие мы хотим произвести с ресурсом.
Изначально (в начале 90-х) предполагалось, что клиент может хотеть от ресурса только одно — получить его, однако сейчас по протоколу HTTP можно создавать посты, редактировать профиль, удалять сообщения и многое другое. И эти действия сложно объединить термином «получение».

Для разграничения действий с ресурсами на уровне HTTP-методов и были придуманы следующие варианты:
*GET* — получение ресурса
*POST* — создание ресурса
*PUT* — обновление ресурса
*DELETE *— удаление ресурса

Спецификация HTTP не обязывает сервер понимать все методы (которых на самом деле гораздо больше, чем 4) — обязателен только GET, а также не указывает серверу, что он должен делать при получении запроса с тем или иным методом. 
Это значит, что сервер 
- в ответ на запрос DELETE /index.php HTTP/1.1 не обязан удалять страницу index.php на сервере, 
- на запрос GET /index.php HTTP/1.1 не обязан возвращать страницу index.php, он может ее удалять.

>> Пример кода c внешним API


        document.getElementById("get-jokes"). addEventListener("click", getJokes);

        function getJokes (e) {
          const numberOfJokes = document.getElementById("number").value;

          const xhr = new XMLHttpRequest();

          xhr.open("GET", `http://api.icndb.com/categories/${numberOfJokes}`, true);

          xhr.onload = function() {
            if(this.status === 200) {
              const res = JSON.parse(this.response);

              let output = "";
              if(res.type === "success") {
                res.value.forEach((item) => {
                  output += `<li>${item.joke}</li>`
                  
                });
              } else {
                output += `<li>Error</li>`
              }

              document.getElementById("jokes").innerHTML = output;

              console.log(res);
            }
          };

          xhr.send();
          e.preventDefault();
        }



## REST

**REST (REpresentational State Transfer)** 
Термин был введен в 2000-м году Роем Филдингом (Roy Fielding) — одним из разработчиков протокола HTTP — в качестве названия группы принципов построения веб-приложений. 

REST охватывает более широкую область, нежели HTTP — его можно применять и в других сетях с другими протоколами. 

REST описывает принципы взаимодействия клиента и сервера, основанные на понятиях «ресурса» и «глагола» (можно понимать их как подлежащее и сказуемое). 
В случае HTTP ресурс определяется своим URI, а глагол — это HTTP-метод.

REST предлагает отказаться от использования одинаковых URI для разных ресурсов (то есть адреса двух разных статей вроде /index.php?article_id=10 и /index.php?article_id=20 — это не REST-way) и использовать разные HTTP-методы для разных действий. 
То есть веб-приложение, написанное с использованием REST подхода будет удалять ресурс при обращении к нему с HTTP-методом DELETE (это не значит, что надо давать возможность удалить всё и вся, но любой запрос на удаление в приложении должен использовать HTTP-метод DELETE).

REST дает программистам возможность писать стандартизованные и чуть более красивые веб-приложения, чем раньше. Используя REST, URI для добавления нового юзера будет не /user.php?action=create (метод GET/POST), а просто /user.php (метод строго POST).

В итоге, совместив имеющуюся спецификацию HTTP и REST-подход наконец-то обретают смысл различные HTTP-методы. 
GET — возвращает ресурс
POST — создает новый
PUT — обновляет существующий
DELETE — удаляет.


>> Пример кода c внешним API

        const posts = [
          {
            title: "Post 1 title",
            body: "Post 1 body text",
          },
          {
            title: "Post 2 title",
            body: "Post 2 body text",
          },
          {
            title: "Post 3 title",
            body: "Post 3 body text",
          },
        ];

        function createPost(post, callback) {
            setTimeout(() => {
              posts.push(post);
              callback();
            }, 3000);
          }

        function getPosts() {
            setTimeout(() => {
              let output = "";
          
              posts.forEach((post) => {
                output += `<li>${post.title}</li>`;
              });
          
          document.body.innerHTML = output;
          }, 1000);
        }

        createPost({title: "Post 4 title", body: "Post 4 bosy text"}, getPosts);

        getPosts();

        console.log(posts);


### Проблемы?

Есть небольшая проблема с применением REST на практике, это  HTML.

PUT/DELETE запросы можно отправлять посредством XMLHttpRequest, посредством обращения к серверу «вручную» (скажем, через curl или даже через telnet), но нельзя сделать HTML-форму, отправляющую полноценный PUT/DELETE-запрос.

Cпецификация HTML не позволяет создавать формы, отправляющие данные иначе, чем через GET или POST. Поэтому для нормальной работы с другими методами приходится имитировать их искусственно. Например, в Rack (механизм, на базе которого Ruby взаимодействует с веб-сервером; с применением Rack сделаны Rails, Merb и другие Ruby-фреймворки) в форму можно добавить hidden-поле с именем "_method", а в качестве значения указать название метода (например, «PUT») — в этом случае будет отправлен POST-запрос, но Rack сможет сделать вид, что получил PUT, а не POST