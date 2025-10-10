import { CtaBanner } from '../components/CtaBanner/CtaBanner'
import { FAQSection } from '../components/FaqSection/FaqSection'

export function Home() {
  return (
    <main>
      <h1 className="fs-5 px-3 py-2">Bem-vindo ao Buscar Patas!</h1>
      <CtaBanner />
      <section id="busca">
        <h2>Conheça os pets que ainda precisam de um lar</h2>
        <h3>Seção de Busca</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
          reiciendis deleniti maxime ab nihil ipsa. A, quam adipisci harum,
          reiciendis accusamus optio dolores omnis eius, minus sunt asperiores
          hic tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Possimus recusandae, exercitationem quos fugiat provident sint,
          aliquid aut tenetur, eligendi nostrum cupiditate ab eaque hic optio
          doloribus perferendis deleniti praesentium placeat. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quos est fuga consequuntur.
          Modi distinctio nam illum iure doloribus veritatis placeat voluptatum
          fuga tenetur voluptate fugit blanditiis similique magnam, odit ab!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          eveniet voluptate ut numquam fuga sint iusto consectetur doloribus
          maxime, nostrum minus iure nesciunt vitae beatae corrupti quia porro
          doloremque eum? Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Et laudantium provident delectus exercitationem nesciunt nam
          placeat accusantium sequi aspernatur sint molestias omnis, officiis
          voluptas suscipit voluptatem repudiandae ducimus cupiditate maxime.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis ipsum
          eaque officiis exercitationem veritatis officia consectetur ea sed
          deserunt dignissimos? Voluptatibus, maxime nulla? Quis doloribus
          adipisci similique dicta, enim molestias.
        </p>
      </section>

      <section>
        <FAQSection />
      </section>
    </main>
  )
}
