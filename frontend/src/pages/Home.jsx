import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { CtaBanner } from '../components/CtaBanner/CtaBanner';
import { FAQSection } from '../components/FaqSection/FaqSection';
import { PetFilters } from '../components/PetFilters/PetFilters';
import { PetList } from '../components/PetList/PetList';

export function Home() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    async function fetchPets() {
      setLoading(true);
      
      // String de query com os filtros ativos
      const queryParams = new URLSearchParams(filters).toString();
      const url = `http://localhost:3000/pets?${queryParams}`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Falha ao buscar pets:", error);
        // Em caso de erro, define a lista de pets como vazia
        setPets([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPets();
  }, [filters]); 

  // Função que será chamada pelo componente PetFilters quando o usuário aplicar um filtro
  const handleFilterChange = (newFilters) => {
    // Remove filtros vazios (ex: { tamanho: "" }) antes de atualizar o estado
    const activeFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([, value]) => value !== '')
    );
    setFilters(activeFilters);
  };

  return (
    <main>
      <CtaBanner />

      {/* Esta é a seção de busca que será renderizada */}
      <Container as="section" id="busca" className="py-5 my-4">
        <h2 className="text-center mb-4 display-5 fw-light">Encontre seu novo amigo</h2>
        
        {/* Componente de Filtros */}
        <PetFilters onFilterChange={handleFilterChange} />
        
        {/* Componente que lista os Pets */}
        <PetList pets={pets} loading={loading} />
      </Container>

      <FAQSection />
    </main>
  );
}