export default async function handler ( req , res ) {     
  // 1. On n'accepte que les requêtes POST
  si ( req.method !== ' POST ' ) {    
    return res . status ( 405 ) . json ( { error : 'Méthode non autorisée' } ) ;   
  }

  essayer { 
    // 2. On récupère la clé secrète depuis les variables d'environnement de Vercel
    const lecartSecret = process . env . LECART_SECRET_KEY ;
    si ( ! lecartSecret ) {  
      return res.status ( 500 ) .json ( {​​​ 
        erreur : 'Configuration serveur manquante : la variable LECART_SECRET_KEY est absente sur Vercel.'  
      } ) ;
    }

    // 3. On transmet la requête à l'API LeCart avec le bon en-tête (X-API-Key)
    const response = await fetch ( 'https://api.getlecart.com/create-checkout' , {   
      méthode : 'POST' , 
      en-têtes : { 
        'Content-Type' : 'application/json' , 
        'X-API-Key' : lecartSecret , // <-- C'est ici que la clé est transmise 
      } ,
      corps : JSON.stringify ( req.body ) ,​​​​ 
    } ) ;

    // 4. On récupère la réponse de LeCart
    const data = await response . json ( ) ; 

    // 5. Si LeCart renvoie une erreur, sur la transmission au navigateur
    si ( ! réponse . ok ) {  
      retourner res.status ( response.status ) .json ( données ) ;​​​​​
    }

    // 6. Si tout est bon, on renvoie l'URL de paiement Stripe générée par LeCart
    retourner res . status ( 200 ) . json ( données ) ;

  } catch ( erreur ) {   
    console.error ( ' Erreur lors du paiement par proxy :' , error ) ;
    retourner la résolution . statut ( 500 ) . json ( { error : 'Erreur interne du serveur' } ) ;   
  }
}