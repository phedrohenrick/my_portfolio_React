import diagram from "../../assets/images/articles/abstraction-in-java.svg";
import type { Article, Block } from "./types";

// Capa e figura do artigo usam a mesma imagem por enquanto.
const coverAlt = {
  en: "Diagram: a class uses an interface, an abstract class implements it and a subclass extends the abstract class",
  pt: "Diagrama: uma classe usa uma interface, uma classe abstrata a implementa e uma subclasse estende a classe abstrata",
};

const en: Block[] = [
  { type: "heading", id: "abstract-classes", text: "Abstract classes" },
  {
    type: "paragraph",
    text: "A *Java abstract class* is a class which cannot be instantiated, meaning you cannot create new instances of an abstract class. The purpose of an abstract class is to function as a base for subclasses.",
  },
  { type: "code", file: "MyAbstractClass.java", code: "public abstract class MyAbstractClass {\n\n}" },
  { type: "paragraph", text: "The code above shows how to declare an abstract class in Java." },
  { type: "code", code: "MyAbstractClass myClassInstance =\n    new MyAbstractClass();  // not valid" },
  {
    type: "paragraph",
    text: "If you try to compile the code above, the Java compiler will generate an error, saying that you cannot instantiate `MyAbstractClass` because it is an abstract class.",
  },

  { type: "heading", id: "abstract-methods", text: "Abstract methods" },
  {
    type: "list",
    items: [
      "An abstract method has no implementation. It just has a signature, just like methods in Java interfaces.",
      "If a class has any abstract method, the whole class must be declared as abstract.",
      "Not all methods in an abstract class have to be abstract: an abstract class can have a mix of both. The non-abstract methods of the superclass are just inherited as they are. They can also be overridden, if needed.",
    ],
  },

  { type: "heading", id: "purpose", text: "Purpose" },
  {
    type: "paragraph",
    text: "The purpose of abstract classes is to function as base classes that can be extended by subclasses to create a full implementation. Imagine 3 steps:",
  },
  { type: "list", ordered: true, items: ["Read the recipe", "Choose the ingredients", "Mix them"] },
  {
    type: "paragraph",
    text: "Steps 1 and 3 don't change, but step 2 does, as the ingredients are different across recipes. Since steps 1 and 3 are always the same, they can be implemented in an abstract superclass.",
  },

  { type: "heading", id: "interfaces-vs-abstract-classes", text: "Java interfaces vs abstract classes" },
  {
    type: "paragraph",
    text: "In Java we use interfaces to decouple the class that uses the interface from the class that implements it. That is to say, to make the class using the interface independent from the class that implements the interface. We also use interfaces to achieve polymorphism.",
  },
  {
    type: "callout",
    title: "To remember",
    text: "A Java class can only have **1 superclass**, but it can implement **multiple interfaces**. Thus, if a class already has a different superclass, it can implement an interface, but it can't extend another abstract class.",
  },
  {
    type: "paragraph",
    text: "So if you need to separate the interface from the implementation, use an interface. If you also need to provide a base class or default implementation of the interface, add an abstract class (or normal class) that implements it.",
  },
  {
    type: "figure",
    src: diagram,
    alt: coverAlt.en,
    caption: "The blue class knows only the interface. The abstract class implements the interface, and the subclass inherits from the abstract class.",
  },
  { type: "paragraph", text: "Think about the previous image as a payment system:" },
  {
    type: "definitions",
    items: [
      { term: "Class", text: "`CheckoutService`, which uses the interface (it doesn't know about the implementation)." },
      { term: "Interface", text: "`PaymentService`, which has a single method: `void processPayment(double amount);`" },
      { term: "Abstract class", text: "the implementation, such as `CreditCardPayment` or `PixPayment`." },
      { term: "Subclass", text: "doesn't necessarily have to implement the interface's contract, it can go directly to the implementation." },
    ],
  },

  { type: "heading", id: "interview-questions", text: "Favorite questions every Java programmer should know for technical interviews" },
  { type: "paragraph", text: "Here are the 6 most common abstract class interview questions, answered clearly." },
  {
    type: "questions",
    items: [
      {
        question: "Can an abstract class have a constructor?",
        verdict: "yes",
        short: "Yes, it can.",
        body: [
          {
            type: "paragraph",
            text: "Even though you cannot instantiate an abstract class directly, because that causes a compile error, like in the next example:",
          },
          { type: "code", code: "AbstractClass instance = new AbstractClass();  // compile error" },
          {
            type: "paragraph",
            text: "it can have fields that need initialization. When a subclass is created, its constructor delegates initialization to the parent using `super()`.",
          },
        ],
      },
      {
        question: "Can an abstract class be final?",
        verdict: "no",
        short: "No, it can't.",
        body: [
          {
            type: "paragraph",
            text: "This creates a direct compile-time conflict: `final` prevents inheritance, while `abstract` requires inheritance to be implemented. Making an abstract class `final` would render it completely useless.",
          },
        ],
      },
      {
        question: "Can an abstract class have static fields or methods?",
        verdict: "yes",
        short: "Yes, it can.",
        body: [
          {
            type: "paragraph",
            text: "Static members belong to the class itself, not to an instance. Static blocks are executed when the JVM loads the class into memory. Since you don't need an object to call static methods, you can invoke them directly via the class name: `AbstractClass.staticMethod()`. You can also use static blocks for initialization.",
          },
        ],
      },
      {
        question: "Can an abstract class have private methods?",
        verdict: "yes-but",
        short: "Yes, but with a major catch.",
        body: [
          {
            type: "list",
            items: [
              "**Concrete private methods ARE allowed:** useful as internal helper methods shared across other methods in the same class.",
              "**Private abstract methods ARE FORBIDDEN:** an abstract method must be overridden by a subclass, but `private` prevents subclasses from seeing it!",
            ],
          },
        ],
      },
      {
        question: "Can an abstract class have final methods?",
        verdict: "yes",
        short: "Yes.",
        body: [
          {
            type: "paragraph",
            text: "Concrete methods inside an abstract class can be marked `final` to enforce a strict template algorithm (Template Method Pattern). Subclasses can implement the abstract steps, but cannot override the core `final` workflow.",
          },
        ],
      },
      {
        question: "Can an abstract class have ZERO abstract methods?",
        verdict: "yes",
        short: "Yes.",
        body: [
          {
            type: "paragraph",
            text: "Java allows you to declare a class `abstract` even if all its methods are fully implemented. This is used when you want to prevent direct instantiation of a base class without forcing subclasses to override anything.",
          },
        ],
      },
    ],
  },

  { type: "heading", id: "key-takeaway", text: "Key takeaway" },
  {
    type: "takeaway",
    title: "Key takeaway",
    text: "Abstract classes aren't just interfaces with code: they are structural blueprints that allow **constructor chaining**, **state management**, **static utilities** and **template enforcement**.",
  },
];

const pt: Block[] = [
  { type: "heading", id: "abstract-classes", text: "Classes abstratas" },
  {
    type: "paragraph",
    text: "Uma *classe abstrata em Java* é uma classe que não pode ser instanciada, ou seja, você não consegue criar novas instâncias dela. O propósito de uma classe abstrata é servir de base para subclasses.",
  },
  { type: "code", file: "MyAbstractClass.java", code: "public abstract class MyAbstractClass {\n\n}" },
  { type: "paragraph", text: "O código acima mostra como declarar uma classe abstrata em Java." },
  { type: "code", code: "MyAbstractClass myClassInstance =\n    new MyAbstractClass();  // não é válido" },
  {
    type: "paragraph",
    text: "Se você tentar compilar o código acima, o compilador Java vai gerar um erro dizendo que não é possível instanciar `MyAbstractClass` porque ela é uma classe abstrata.",
  },

  { type: "heading", id: "abstract-methods", text: "Métodos abstratos" },
  {
    type: "list",
    items: [
      "Um método abstrato não tem implementação. Ele tem apenas uma assinatura, assim como os métodos de uma interface Java.",
      "Se uma classe tem qualquer método abstrato, a classe inteira precisa ser declarada como abstrata.",
      "Nem todos os métodos de uma classe abstrata precisam ser abstratos: ela pode misturar os dois tipos. Os métodos não abstratos da superclasse são simplesmente herdados como estão. Eles também podem ser sobrescritos, se necessário.",
    ],
  },

  { type: "heading", id: "purpose", text: "Propósito" },
  {
    type: "paragraph",
    text: "O propósito das classes abstratas é funcionar como classes base, que podem ser estendidas por subclasses para criar uma implementação completa. Imagine 3 passos:",
  },
  { type: "list", ordered: true, items: ["Ler a receita", "Escolher os ingredientes", "Misturar tudo"] },
  {
    type: "paragraph",
    text: "Os passos 1 e 3 não mudam, mas o passo 2 muda, porque os ingredientes são diferentes de uma receita para outra. Como os passos 1 e 3 são sempre iguais, eles podem ser implementados numa superclasse abstrata.",
  },

  { type: "heading", id: "interfaces-vs-abstract-classes", text: "Interfaces vs classes abstratas em Java" },
  {
    type: "paragraph",
    text: "Em Java, usamos interfaces para desacoplar a classe que usa a interface da classe que a implementa. Ou seja, para deixar a classe que usa a interface independente da classe que a implementa. Também usamos interfaces para alcançar polimorfismo.",
  },
  {
    type: "callout",
    title: "Para lembrar",
    text: "Uma classe Java só pode ter **1 superclasse**, mas pode implementar **várias interfaces**. Por isso, se uma classe já tem outra superclasse, ela pode implementar uma interface, mas não pode estender outra classe abstrata.",
  },
  {
    type: "paragraph",
    text: "Então, se você precisa separar a interface da implementação, use uma interface. Se também precisa oferecer uma classe base ou uma implementação padrão da interface, adicione uma classe abstrata (ou uma classe comum) que a implemente.",
  },
  {
    type: "figure",
    src: diagram,
    alt: coverAlt.pt,
    caption: "A classe azul conhece apenas a interface. A classe abstrata implementa a interface, e a subclasse herda da classe abstrata.",
  },
  { type: "paragraph", text: "Pense na imagem anterior como um sistema de pagamento:" },
  {
    type: "definitions",
    items: [
      { term: "Classe", text: "`CheckoutService`, que usa a interface (não conhece a implementação)." },
      { term: "Interface", text: "`PaymentService`, que tem um único método: `void processPayment(double amount);`" },
      { term: "Classe abstrata", text: "a implementação, como `CreditCardPayment` ou `PixPayment`." },
      { term: "Subclasse", text: "não precisa necessariamente implementar o contrato da interface, pode ir direto para a implementação." },
    ],
  },

  { type: "heading", id: "interview-questions", text: "Perguntas favoritas que todo programador Java deveria saber para entrevistas técnicas" },
  { type: "paragraph", text: "Aqui estão as 6 perguntas mais comuns sobre classes abstratas em entrevistas, respondidas com clareza." },
  {
    type: "questions",
    items: [
      {
        question: "Uma classe abstrata pode ter construtor?",
        verdict: "yes",
        short: "Sim, pode.",
        body: [
          {
            type: "paragraph",
            text: "Mesmo que você não consiga instanciar uma classe abstrata diretamente, porque isso causa um erro de compilação, como no exemplo a seguir:",
          },
          { type: "code", code: "AbstractClass instance = new AbstractClass();  // erro de compilação" },
          {
            type: "paragraph",
            text: "ela pode ter atributos que precisam ser inicializados. Quando uma subclasse é criada, o construtor dela delega a inicialização para a classe pai usando `super()`.",
          },
        ],
      },
      {
        question: "Uma classe abstrata pode ser final?",
        verdict: "no",
        short: "Não, não pode.",
        body: [
          {
            type: "paragraph",
            text: "Isso cria um conflito direto em tempo de compilação: `final` impede a herança, enquanto `abstract` exige herança para ser implementada. Uma classe abstrata `final` seria completamente inútil.",
          },
        ],
      },
      {
        question: "Uma classe abstrata pode ter atributos ou métodos estáticos?",
        verdict: "yes",
        short: "Sim, pode.",
        body: [
          {
            type: "paragraph",
            text: "Membros estáticos pertencem à própria classe, não a uma instância. Blocos estáticos são executados no momento em que a JVM carrega a classe na memória. Como você não precisa de um objeto para chamar métodos estáticos, pode chamá-los direto pelo nome da classe: `AbstractClass.staticMethod()`. Você também pode usar blocos estáticos para inicialização.",
          },
        ],
      },
      {
        question: "Uma classe abstrata pode ter métodos privados?",
        verdict: "yes-but",
        short: "Sim, mas com uma pegadinha importante.",
        body: [
          {
            type: "list",
            items: [
              "**Métodos privados concretos SÃO permitidos:** úteis como métodos auxiliares internos, compartilhados entre outros métodos da mesma classe.",
              "**Métodos privados abstratos SÃO PROIBIDOS:** um método abstrato precisa ser sobrescrito por uma subclasse, mas `private` impede que as subclasses o enxerguem!",
            ],
          },
        ],
      },
      {
        question: "Uma classe abstrata pode ter métodos final?",
        verdict: "yes",
        short: "Sim.",
        body: [
          {
            type: "paragraph",
            text: "Métodos concretos de uma classe abstrata podem ser marcados como `final` para impor um algoritmo-modelo rígido (padrão Template Method). As subclasses implementam os passos abstratos, mas não podem sobrescrever o fluxo principal `final`.",
          },
        ],
      },
      {
        question: "Uma classe abstrata pode ter ZERO métodos abstratos?",
        verdict: "yes",
        short: "Sim.",
        body: [
          {
            type: "paragraph",
            text: "O Java permite declarar uma classe como `abstract` mesmo que todos os métodos dela estejam implementados. Isso é usado quando você quer impedir a instanciação direta de uma classe base sem obrigar as subclasses a sobrescrever nada.",
          },
        ],
      },
    ],
  },

  { type: "heading", id: "key-takeaway", text: "Resumo" },
  {
    type: "takeaway",
    title: "Resumo",
    text: "Classes abstratas não são só interfaces com código: são estruturas-modelo que permitem **encadeamento de construtores**, **gerenciamento de estado**, **utilitários estáticos** e **imposição de templates**.",
  },
];

export const abstractionInJava: Article = {
  slug: "abstraction-in-java",
  lang: "en",
  date: "2026-10-26",
  readingMinutes: 6,
  tags: ["java", "oop", "interviews"],
  cover: diagram,
  title: {
    en: "Abstraction in Java - have good answers to tech questions",
    pt: "Abstração em Java - responda bem perguntas técnicas",
  },
  summary: {
    en: "Abstract classes, interfaces and the 6 technical questions every Java dev should be able to answer.",
    pt: "Classes abstratas, interfaces e as 6 perguntas técnicas sobre abstração que todo dev Java deveria saber responder.",
  },
  coverAlt,
  closing: {
    en: "Which of these questions has tripped you up the most in interviews? Let's discuss in the comments!",
    pt: "Qual dessas perguntas mais te pegou em entrevistas? Vamos conversar nos comentários!",
  },
  blocks: { en, pt },
};
