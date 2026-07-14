import { useState, CSSProperties } from 'react';

export default function DemoApiClient() {
  // Typage explicite de nos states avec TypeScript
  const [apiResponse, setApiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const callPingEndpoint = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setApiResponse('');

    try {
      const response = await fetch('http://localhost:8080/api/data');
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
      }

      const data: string = await response.text();
      setApiResponse(data);
    } catch (err) {
      // En TypeScript, l'erreur attrapée est de type 'unknown' par défaut
      if (err instanceof Error) {
        setError(`Échec de l'appel : ${err.message}`);
      } else {
        setError("Une erreur inconnue est survenue.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Typage des objets de style CSS inline avec le type CSSProperties de React
  const cardStyle: CSSProperties = {
    maxWidth: '500px',
    margin: '10px auto',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    color: '#333'
  };

  const buttonStyle: CSSProperties = {
    backgroundColor: isLoading ? '#cbd5e1' : '#4F46E5',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s',
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ color: '#4F46E5', marginBottom: '10px' }}>Connexion Spring Boot 🍃 (TS)</h2>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>
        Appuyez sur le bouton pour tester la communication avec le backend.
      </p>

      <button 
        onClick={callPingEndpoint} 
        disabled={isLoading}
        style={buttonStyle}
      >
        {isLoading ? 'Connexion en cours...' : 'Appeler /api/ping'}
      </button>

      <div style={{ marginTop: '25px', minHeight: '60px' }}>
        {apiResponse && (
          <div style={{ padding: '15px', backgroundColor: '#ECFDF5', borderRadius: '8px', color: '#065F46', fontWeight: '500', border: '1px solid #A7F3D0' }}>
            {apiResponse}
          </div>
        )}

        {error && (
          <div style={{ padding: '15px', backgroundColor: '#FEF2F2', borderRadius: '8px', color: '#991B1B', fontWeight: '500', border: '1px solid #FCA5A5' }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}