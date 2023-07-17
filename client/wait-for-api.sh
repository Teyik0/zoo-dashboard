#!/bin/bash

# Fonction pour vérifier la disponibilité de l'API
wait_for_api() {
  echo "En attente de l'API..."

  while ! curl -sSf http://172.31.0.2:3000/area > /dev/null; do
    echo "L'API n'est pas encore prête. Réessai dans 5 secondes..."
    sleep 5
  done

  echo "L'API est prête. Démarrage du service Web..."
}

# Appel de la fonction pour attendre l'API avant de démarrer le service Web
wait_for_api

# Lancer le service Web
exec "$@"
