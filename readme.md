# Web Myna

Depuis longtemps, l'idée d'avoir un système permettant d'enregistrer des calls API pour s'en servir dans des tests fonctionnels ou e2e fait son trou. J'ai essayé plusieurs systèmes :

* Polly avec son enregistrement REST. Mais Polly impose beaucoup de configuration, et laisse trop dépendant de la librairie dans les tests.
* RestBird https://restbird.org/ . Le projet est encore un peu jeune, la documentation encore trop lacunaires. Et surtout, on ne peut pas lancer le serveur de mock que sur localhost, ce qui pose problème au sein d'un docker-compose.
* Http Toolkit https://github.com/httptoolkit/mockttp. C'est un système payant pour profiter de toutres les features, et il ne fonctionne pas vraimant comme un serveur d'API (mocké), mais plus comme un intercepteur de requêtes.
* Mock server http://www.mock-server.com/#what-is-mockserver . Sûrement le projet le plus tentant, mais qui semble vraiment trops compliqué !

Donc rien qui n'allait vraimant.

Voila ce que j'attend d'un tel outil :

* indépendant d'une technologie: l'idée, c'est de configurer l'application consomatrice de l'API pour pointer vers l'API recorder. C'est tout.
* l'API recorder est configuré pour cette route d'API et qu'il a déjà enregistré la réponse, il la retourne
* si l'API recorder est configuré pour cette route d'API et qu'il n'a pas d'enregistrement, il enregistre (ou pas - sur la ci => variable d'env gouvernant ce comportement)
* Si l'API nécessite une autentification, c'est dans la configuration de l'API recorder que c'est indiqué, et il utilise des variable d'env pour ne pas enregistrer les secrets en dur. Jamais (attention au records du coup)
* Toutes le conf de l'API recorder doit être isolé et versionnable (SQLite et json ?)
* On doit pouvoir facilement refaire des enregistrement complêts lorsque l'API change. Idéalement, un fonctionnalité doit permettre de verifier un enregistrement specifique pour le comparrer à la vrai réponse de l'API
* Eventuellement, avoir une notion d'équipe, c'est à dire d'associer des services mocker à des équipes de travail (genre en utilisant un token d'auth depuis les tests pour identifier une équipe ?)
* Il faudra donc une interface de gestion du server API Recorder
* Le système devra tourner aussi bien en local que dans un container docker. A vrai dire surtout dans un container docker

