import { Alert } from "react-bootstrap";
import TeX from '@matejmazur/react-katex';


export enum Locale {
    None,
    French,
    English
}

interface LocaleEntry {
    [key: string]: string | JSX.Element
}

interface LocaleTextOnly {
    [key: string]: string
}

export class LocaleManager {
    
    public static currentLocale = Locale.None
    public static frenchLocale : LocaleEntry = {
        "previous": "Précedent",
        "retry t1": "Recommencer entraînement T1",
        "retry t2": "Recommencer entraînement T2",
        "retry t3": "Recommencer entraînement T3",
        "retry t4": "Recommencer entraînement T4",
        "next": "Suivant",
        "no cookies": "Les cookies ne sont pas activés.",
        "button-cookies-error":"Les cookies ne sont pas activés. Ils sont nécessaire pour effectuer l'évaluation.",
        "intro-title": "Introduction",
        "begin-eval": "Commencer l'évaluation",
        "alert-cookies": <Alert variant="secondary">Ce site web d'évaluation nécessite les autorisations pour exécuter du code JavaScript ainsi que pour utiliser les cookies. Si vous voyez ce message, c'est que le JavaScript est bien autorisé.</Alert>,
        "intro-0-1":<div>Cette évaluation porte sur la représentation de données en hautes dimensions <TeX>{`\\mathbb{R}^N`}</TeX> sur un écran.
        Plus précisément, nous évaluons l’efficacité de deux représentations pour des tâches communément effectuées lors de la visualisation de telles données.
        Nous visualiserons plusieurs jeux de données pendant cette évaluation, et une étiquette est attribuée à chaque élément.</div>,
        "intro-0-2":<div>Les deux méthodes de projections évaluées sont (1) une méthode de projection non-linéaire sur un espace <TeX>{`\\mathbb{R}^2`}</TeX> continu qu'on appellera "projection classique" (en haut sur le diagramme) et une méthode qui projette sur une grille en espace discret <TeX>{`\\mathbb{N}^2`}</TeX> qu’on appellera "projection compacte" (en bas sur le diagramme).
        Les deux projections font en sorte de représenter le jeu de données de façon à ce que les éléments qui sont proches dans <TeX>{`\\mathbb{R}^N`}</TeX> le soient aussi sur la vue 2D.</div>,
        "intro-1-1":<div>Dans ces deux méthodes, chaque carré représente un élément du jeu de données projeté.
            En plus des deux méthodes de projections, nous proposons aussi deux colorations de ces carrés.</div>,
        "intro-1-2":<div>La première concerne les étiquettes : chaque étiquette dans le jeu de données se voit attribuée une couleur distincte des autres.
        Chaque élément est ensuite colorié par rapport à son étiquette.
        La signification derrière les étiquettes importe peu dans cette évaluation, mais faire la distinction entre deux éléments par rapport à leur étiquette est important.</div>,
        "intro-2-1":<div>La seconde concerne la proximité des éléments dans <TeX>{`\\mathbb{R}^N`}</TeX>. Elle a pour objectif de donner des indications sur la topologie des éléments dans <TeX>{`\\mathbb{R}^N`}</TeX> en se basant sur le voisinage des éléments dans <TeX>{`\\mathbb{R}^2`}</TeX>.</div>,
        "intro-2-2":<div>Cette coloration se calcule en deux étapes. La première consiste à récupérer les voisins de chaque éléments à partir de la projection <TeX>{`\\mathbb{R}^2`}</TeX>.
        Le voisinage d'un élément <TeX>e</TeX> correspond aux plus proches éléments dans chaque secteur angulaire autour de <TeX>e</TeX>.
        Ici, nous considérons 8 secteurs angulaires pour calculer le voisinage.</div>,
        "intro-3-1": <div>Après avoir déterminé le voisinage <TeX>V(e)</TeX> d’un élément <TeX>e</TeX>, on calcule la moyenne des distances <TeX>{'\\overline{d}=\\frac{\\sum_{k \\in V(e)}|e-k|}{8}'}</TeX> entre <TeX>e</TeX> et ses voisins <TeX>k \in V(e)</TeX>. Une couleur est attribuée au carré pour représenter cette valeur.
        L’échelle de couleurs n’est pas linéaire, mais de manière générale, les distances courtes dans <TeX>{`\\mathbb{R}^N`}</TeX> sont représentées par la couleur jaune/verte et les distances longues sont représentées par la couleur verte foncée/bleue foncée.
        Pour chaque projection utilisant cette méthode de coloration, l’échelle des couleurs sera donnée en légende.</div>,
        "intro-3-2": <div>Cette coloration permet entre autres de comparer la proximité de deux éléments, et donc de représenter une partie de la topologie des données de <TeX>{`\\mathbb{R}^N`}</TeX> sur une projection <TeX>{`\\mathbb{R}^2`}</TeX>. Par exemple, dans ce cas de figure :</div>,
        "intro-3-3":<div>Nous cherchons à déterminer le groupe le plus proche de <TeX>B</TeX>. On compare alors la couleur des éléments de <TeX>B</TeX> qui forment la frontière avec <TeX>A</TeX> et <TeX>C</TeX> pour connaître la distance qui les sépare. Les éléments représentant la distance <TeX>{'d_{AB}'}</TeX> sont de couleur bleue foncée et ceux qui représentent la distance <TeX>{'d_{BC}'}</TeX> sont de couleur verte. On peut donc en conclure que dans <TeX>{`\\mathbb{R}^N`}</TeX>, le groupe <TeX>B</TeX> est plus proche du groupe <TeX>C</TeX> que du groupe <TeX>A</TeX>.</div>,
        "intro-4":<div>Autre exemple d'utilisation mais en utilisant cette fois-ci la vue par grille, on cherche une nouvelle fois à trouver quel groupe est plus proche de <TeX>B</TeX>. On compare les couleurs des frontières avec <TeX>A</TeX> et <TeX>C</TeX> pour trouver celle qui indique une distance courte avec <TeX>B</TeX>. Les éléments de la distance <TeX>{'d_{AB}'}</TeX> sont de couleur bleue foncée et ceux qui représentent la distance <TeX>{'d_{BC}'}</TeX> sont de couleur verte. On peut donc en conclure que dans <TeX>{`\\mathbb{R}^N`}</TeX>, le groupe <TeX>B</TeX> est plus proche du groupe <TeX>C</TeX> que du groupe <TeX>A</TeX>.</div>,
        "intro-5-1":<div>
        Dans cette évaluation, nous générons des jeux de données dans <TeX>{`\\mathbb{R}^N`}</TeX> qui suivent des topologies et caractéristiques particulières.
        Nous générons en l'occurence 4 types de structures topologique:
        <ul>
            <li>La première, nommée "partagée", est formée de groupes plus ou moins séparés les uns des autres.</li>
            <li>La seconde, nommée "bulle", est formée d'un groupe qui est complètement intégré dans un autre, sans intersection des volumes.</li>
            <li>La troisième, nommée "mélange", est formée d'un groupe qui se superpose partiellement avec un autre.</li>
            <li>La quatrième, nommée "proche", est formée d'au moins deux groupes significativement proches l'un de l'autre par rapport aux autres.</li>
        </ul>
        En plus de ces topologies, nous pouvons faire varier le nombre de groupes, leurs densités, distances par rapport aux autres groupes, etc...
        Le diagramme ci-dessous donne un exemple de telles données générées en <TeX>{`\\mathbb{R}^2`}</TeX>. </div>,
        "intro-5-2":<div> Les données générées pour l'évaluation sont dans des espaces à plus de deux dimensions.
        Dans cette évaluation, nous cherchons à retrouver ces caractéristiques et topologies en employant les méthodes de projections et de coloration présentées précédemment.</div>,
        "intro-6": <div>Enfin, une dernière caractéristique que l'on peut gérer concerne les étiquettes des éléments. Certains éléments ayant une étiquette A peuvent être positionnés dans un groupe d'étiquette B, on appellera ces éléments des <b>intrus</b>.
        Dans l'exemple ci-dessous, le même jeu de données est projeté avec les deux méthodes. Les intrus générés sont encadrés en rose.
        Les intrus peuvent parfois être cachés par d'autres éléments dessinés par dessus. Il faudra faire attention à ceux-ci.</div>,
        "intro-7":<div>
        <div>
            Cette évaluation comporte 4 tâches différentes :<br/>
            T1 : Trouver l'étiquette de groupe la plus représentée<br/>
            T2 : Trouver quel groupe est plus proche d’un autre dans <TeX>{`\\mathbb{R}^N`}</TeX><br/>
            T3 : Trouver la topologie des données dans <TeX>{`\\mathbb{R}^N`}</TeX><br/>
            T4 : Compter le nombre d'intrus dans un groupe donné<br/><br/>
        </div>
        <div>
            Ces tâches sont réparties en 74 questions. Les colorations utilisées diffèrent suivant les tâches proposées. Certaines questions sont volontairement difficiles et demandent donc du temps pour être répondues, vous disposez en revanche d'1 minute par question pour répondre.
            A la fin du questionnaire, nous demanderons quelles stratégies vous aurez utilisé pour répondre aux questions.
            Répondre correctement est plus profitable que répondre rapidement, surtout pour la tâche T4. Aussi, il n'y aura pas d'intrus dans les données projetées pour les tâches T1 à T3.<br/>
            Nous allons à présent montrer comment répondre aux différentes tâches.
        </div>
    </div>,
    "intro-8":<div>

    <b>T1 : Trouver l'étiquette la plus représentée</b><br/><br/>

    Pour cette tâche, il y aura des données composées avec entre 3 et 6 groupes différents pour chaque question.
    Seule la coloration par étiquette sera utilisée.
    La tâche consiste à choisir la couleur de l'étiquette qui semble être la plus représentée (plus nombreuse) à l’écran.
    </div>,
    "intro-10-1":<div><b>T2 : Trouver quel groupe est plus proche d’un autre dans <TeX>{`\\mathbb{R}^N`}</TeX></b><br/><br/>

    Pour cette tâche, nous considérerons que les données générées seront composées de soit 5, soit 7 groupes pour chaque question.
    Des questions n'auront que la coloration par étiquette, d'autres proposeront les deux colorations à l’écran.<br/>
    Vous devrez désigner le groupe le plus proche dans <TeX>{`\\mathbb{R}^N`}</TeX> de celui que l'on désigne par sa couleur.
    Lorsque seule la coloration par étiquette est proposée, il faut chercher des indices montrant que les groupes sont proches dans <TeX>{`\\mathbb{R}^N`}</TeX>.
    Dans le cas de la vue classique, des éléments peuvent être rapprochés, voire même se superposer avec d'un autre groupe pour indiquer leur proximité dans <TeX>{`\\mathbb{R}^N`}</TeX>.
    Dans le cas de la vue par grille, les éléments sont triés par proximité. La forme des frontières peut aussi indiquer la proximité d'un groupe: les frontières plus verticales indiquent une plus grande distance entre les deux groupes.</div>,
    "intro-10-2":<div>Lorsque les deux colorations sont proposées, la couleur de la frontière entre deux groupes sur la coloration par distances apporte des informations supplémentaires sur la structure des données dans <TeX>{`\\mathbb{R}^N`}</TeX>.
    Pour les deux méthodes, un groupe ayant une frontière claire/jaune avec avec un autre indique une plus grande proximité par rapport aux autres groupes.
    </div>,
    "intro-12-1":<div>
    <b>T3 : Trouver la topologie des données dans <TeX>{`\\mathbb{R}^N`}</TeX></b><br/><br/>

    Pour cette tâche, nous considérerons que les données générées seront composées de soit 5, soit 7 groupes pour chaque question.
    Des questions n'auront que la coloration par étiquette, d'autres proposeront les deux colorations à l’écran.<br/>

    Cette tâche a pour objectif de retrouver la topologie des données dans <TeX>{`\\mathbb{R}^N`}</TeX> en se servant de la projection proposée.
    Chaque topologie, sera représentée par un diagramme.
    Leur signification peut être rappelée en passant le curseur de la souris sans cliquer par-dessus le diagramme.
    Si vous hésitez entre plusieurs réponses, choisissez la topologie qui vous semble être la mieux représentée sur la visualisation.
    Les caractéristiques possibles sont :
            </div>,
    "intro-12-2":<span>"Partagée" : Les groupes sont plus ou moins écartés les uns des autres dans <TeX>{`\\mathbb{R}^N`}</TeX> : </span>,
    "intro-12-3":<span>"Bulle" : Il y a au moins un groupe positionné à l’intérieur d’un autre sans se mélanger ou se superposer dans <TeX>{`\\mathbb{R}^N`}</TeX> : </span>,
    "intro-12-4":<span>"Mélange" : Il y a au moins deux groupes qui se mélangent ou se superposent dans <TeX>{`\\mathbb{R}^N`}</TeX> : </span>,
    "intro-12-5":<span>"Proche" : Il y a au moins deux groupes qui sont significativement plus proches entre eux dans <TeX>{`\\mathbb{R}^N`}</TeX> par rapport aux autres : </span>,
    "intro-14":<div>
    <b>T4 : Trouver le nombre d'intrus dans les données</b><br/><br/>
    Pour cette tâche, nous considèrerons qu’il y a soit 5, soit 7 groupes à chaque question.
    Seule la coloration par étiquette sera proposée à l'écran.<br/>
    Pour répondre à cette question, il faut trouver le nombre d’éléments dont l'étiquette est différent de ses voisins au sein du groupe demandé.
    Comme indiqué en début d'introduction, certains éléments (dont des intrus) peuvent être partiellement cachés par d'autres.
    Il faudra faire attention à ceux-ci lorsque vous répondrez aux questions.
    La réponse est à donner en utilisant le clavier à l’écran, puis en cliquant sur SUIVANT.
    En cas d’erreur, cliquer sur ANNULER efface la réponse en cours.
    </div>,
    "intro-16":<div>
    Comme mentionné précédemment, vous disposez de 60 secondes pour répondre à chaque question. Lorsque le temps est écoulé, la dernière réponse que vous aurez sélectionnée sera enregistrée.
    Au début de chaque tâche, vous disposez d'autant de temps de pause que vous le souhaitez.
    Enfin, les questions seront espacées de 2 secondes d'intervalles.
    
    Les explications sont maintenant terminées, vous pouvez cliquer sur Commencer pour commencer l'évaluation. 
    </div>,
    "end-1":" L'évaluation est maintenant terminée, merci beaucoup pour votre participation. ",
    "end-2":"Nous souhaiterions maintenant avoir vos retours sur votre utilisation des différentes méthodes de projection et de coloration. Nous avons donc préparé un questionnaire pour reccueillir vos remarques sur ce lien : ",
    "end-3":"Un identifiant devrait être pré-rempli pour la première question, afin de faire le lien entre vos réponses sur l'évaluation et le questionnaire. Si ce n'est pas le cas, l'identifiant à renseigner sur la première question est: ",
    "download-answers":"Télécharger les réponses",
    "next-question-1":"Prochaine question dans ",
    "next-question-2":"seconde",

    }

    public static frenchAnswers : LocaleTextOnly = {
        "red":"rouge",
        "blue":"bleu",
        "green":"vert",
        "purple":"violet",
        "orange":"orange",
        "yellow":"jaune",
        "brown":"marron",
        "pink":"rose",
        "gray":"gris",
        "split":"partagée",
        "bubble":"bulle",
        "mix":"mélange",
        "close":"proche",
        "title-split":"'Partagée' : Les groupes sont plus ou moins écartés les uns des autres dans R^N",
        "title-bubble":"'Bulle' : Il y a au moins un groupe positionné à l’intérieur d’un autre sans se mélanger ou se superposer dans R^N",
        "title-mix":"'Mélange' : Il y a au moins deux groupes qui se mélangent ou se superposent dans R^N",
        "title-close":"'Proche' : Il y a au moins deux groupes qui sont significativement plus proches entre eux dans R^N par rapport aux autres",
        "proceed":"Valider",
        "next":"Suivant",
        "cancel":"Annuler",
        "alert-correct-1":"Correct ! Cliquez sur Suivant pour passer à la tâche suivante.",
        "alert-correct-2":"Correct ! Cliquez sur Suivant pour passer à l'essai suivant.",
        "alert-incorrect":"Incorrect ! La bonne réponse est ",
        "back-to-intro":"Revenir aux explications"
    }

    public static frenchPath: LocaleTextOnly = {
        "intro-0": "intro/fr/pipeline-proj.png",
        "intro-1": "intro/fr/pipeline-col.png",
        "intro-2-1": "intro/fr/pipeline-dist.png",
        "intro-2-2": "intro/fr/knn.png",
        "intro-3": "intro/fr/dist-usage-tsne.png",
        "intro-4": "intro/fr/dist-usage-ssm.png",
        "intro-5": "intro/fr/struct-overview.png",
        "intro-6-1":"intro/tsneGT-out.png",
        "intro-6-2": "intro/ssmGT-out.png",
        "legend": "./intro/fr/legend.png"
    }

    public static englishLocale : LocaleEntry = {
        "previous": "Previous",
        "retry t1": "Repeat T1 training",
        "retry t2": "Repeat T2 training",
        "retry t3": "Repeat T3 training",
        "retry t4": "Repeat T4 training",
        "next": "Next",
        "no cookies": "Cookies are not enabled.",
        "button-cookies-error":"Cookies are not enabled. They are necessary to perform the evaluation.",
        "intro-title": "Introduction",
        "begin-eval": "Start the evaluation",
        "alert-cookies": <Alert variant="secondary">This evaluation website requires permissions to run JavaScript code as well as to use cookies. If you see this message, then JavaScript is enabled.</Alert>,
        "intro-0-1":<div>This evaluation concerns the representation of data in high dimensions <TeX>{`\\mathbb{R}^N`}</TeX> on screen.
        Specifically, we evaluate the effectiveness of two representations for tasks commonly performed when visualizing such data.
        We will visualize several datasets during this evaluation, and each item is assigned a label.</div>,
        "intro-0-2":<div>
        The two projection methods evaluated are (1) a non-linear projection method on a continuous space <TeX>{`\\mathbb{R}^2`}</TeX> that we will call "classical projection" (top on the diagram) and (2) a method that projects on a grid in discrete space <TeX>{`\\mathbb{N}^2`}</TeX> which we will call "compact projection" (below on the diagram).
         Both projections ensure that the dataset is represented in such a way that elements that are close in <TeX>{`\\mathbb{R}^N`}</TeX> are also close in the 2D view.</div>,
        "intro-1-1":<div>In these two methods, each square represents an element of the projected dataset.
        In addition to the two projection methods, we also propose two colorings of these squares.</div>,
        "intro-1-2":<div>The first one concerns the labels: each label in the dataset is assigned a distinct color from the others.
        Each element is then colored in relation to its label.
The meaning behind the labels does not matter in this evaluation, but to distinguish between two elements in relation to their label is important.</div>,
        "intro-2-1":<div>The second concerns the proximity of elements in <TeX>{`\\mathbb{R}^N`}</TeX>. Its purpose is to give hints about the topology of elements in <TeX>{`\\mathbb{R}^N`}</TeX> based on the neighborhood of elements in <TeX>{`\\mathbb{R}^2`}</TeX>.</div>,
        "intro-2-2":<div>This coloring is computed in two steps. The first is to retrieve the neighbors of each element from the <TeX>{`\\mathbb{R}^2`}</TeX> projection.
        The neighborhood of an element <TeX>e</TeX> corresponds to the nearest elements in each angular sector around <TeX>e</TeX>.
        Here, we consider 8 angular sectors to compute the neighborhood.</div>,
        "intro-3-1": <div>After determining the neighborhood <TeX>V(e)</TeX> of an element <TeX>e</TeX>, we compute the average of the distances <TeX>{'\\overline{d}=\\frac{\\sum_{k \\in V(e)}|e-k|}{8}'}</TeX> between <TeX>e</TeX> and its neighbors <TeX>k \in V(e)</TeX>. A color is assigned to the square to represent this value.
        The color scale is not linear, but in general, short distances in <TeX>{`\\mathbb{R}^N`}</TeX> are represented by the color yellow/green and long distances are represented by the color dark green/dark blue.
        For each projection using this coloring method, the color scale will be given in the legend.</div>,
        "intro-3-2": <div>Among other things, this coloring allows us to compare the proximity of two elements, and thus to represent part of the data topology of <TeX>{`\\mathbb{R}^N`}</TeX> on a <TeX>{`\\mathbb{R}^2`}</TeX> projection. For example, in this case :</div>,
        "intro-3-3":<div>We seek to determine the closest group to <TeX>B</TeX>. We therefore compare the color of the elements in <TeX>B</TeX> that form the boundary with <TeX>A</TeX> and <TeX>C</TeX> to find out the distance between them. The elements representing the distance <TeX>{'d_{AB}'}</TeX> are dark blue in color and those representing the distance <TeX>{'d_{BC}'}</TeX> are green. Therefore, we can conclude that in <TeX>{`\\mathbb{R}^N`}</TeX>, the <TeX>B</TeX> group is closer to the <TeX>C</TeX> group than the <TeX>A</TeX> group.</div>,
        "intro-4":<div>Another example of use but this time using the grid view, we again try to find which group is closer to <TeX>B</TeX>. We compare the colors of the boundaries with <TeX>A</TeX> and <TeX>C</TeX> to find the one that indicates a short distance to <TeX>B</TeX>. The elements of the distance <TeX>{'d_{AB}'}</TeX> are dark blue in color and those representing the distance <TeX>{'d_{BC}'}</TeX> are green in color. Therefore, we can conclude that in <TeX>{`\\mathbb{R}^N`}</TeX>, the <TeX>B</TeX> group is closer to the <TeX>C</TeX> group than the <TeX>A</TeX> group.</div>,
        "intro-5-1":<div> 
        In this evaluation, we generate datasets in <TeX>{`\\mathbb{R}^N`}</TeX> that follow particular topologies and characteristics.
        In this case, we generate 4 types of topological structures:
        <ul>
            <li>The first one, called "split", is formed by groups more or less separated from each other.</li>
            <li>The second, called "bubble", is formed by a group that is completely integrated in another, without intersection of volumes.</li>
            <li>The third one, named "mix", is formed by a group that partially overlaps with another one.</li>
            <li>The fourth, called "close", is made up of at least two groups that are significantly close to each other in relation to the others.</li>
        </ul>
        In addition to these topologies, we can vary the number of groups, their densities, distances to other groups, etc...
        The diagram below gives an example of such data generated in  <TeX>{`\\mathbb{R}^2`}</TeX>. </div>,
        "intro-5-2":<div> The data generated for the evaluation are in spaces with more than two dimensions.
        In this evaluation, we seek to recover these features and topologies by employing the projection and coloring methods presented earlier.</div>,
        "intro-6": <div>Finally, a last characteristic that can be manipulated concerns the labels of the elements. Some elements with a label A can be positioned in a group with a label B. We will call these elements <b>outliers</b>.
        In the example below, the same dataset is projected with both methods. The generated intruders are framed in pink.
        The intruders can be hidden by other elements drawn on top of them. You have to be careful with them.</div>,
        "intro-7":<div>
        <div>
            This evaluation has 4 different tasks:<br/>
            T1: Find the most represented group label.<br/>
            T2: Find which group is the closest to another in <TeX>{`\\mathbb{R}^N`}</TeX><br/>
            T3: Find the topology of the data in <TeX>{`\\mathbb{R}^N`}</TeX><br/>
            T4: Count the number of outliers in a given group<br/><br/>
        </div>
        <div>
        These tasks are divided into 74 questions. The coloring used differs according to the tasks proposed. Some questions are deliberately difficult and therefore require time to answer, but you have 1 minute per question to answer.
            At the end of the evaluation, we will ask what strategies you used to answer the questions in a survey.
            Answering correctly is more beneficial than answering quickly, especially for task T4. Also, there will be no intruders in the projected data for tasks T1 to T3.<br/>
            We will now explain how to answer to the different tasks.
        </div>
    </div>,
    "intro-8":<div>

    <b>T1: Find the most represented group label</b><br/><br/>

    For this task, there will be compound data with between 3 and 6 different groups for each question.
    Only label coloring will be used.
    The task is to choose the label color that appears to be the most represented (most numerous) on the screen.
    </div>,
    "intro-10-1":<div><b>T2: Find which group is the closest to another in <TeX>{`\\mathbb{R}^N`}</TeX></b><br/><br/>

For this task, we will consider that the generated data will consist of either 5 or 7 groups for each question.
    Some questions will have only the label coloring, others will offer both colorings on the screen.<br/>
    You will need to designate the closest group in <TeX>{`\\mathbb{R}^N`}</TeX> to the one designated by its color.
    When only label coloring is offered, you should look for clues showing that the groups are close in <TeX>{`\\mathbb{R}^N`}</TeX>.
    In the case of the classic view, elements can be brought together, or even overlap with another group to indicate their proximity in <TeX>{`\\mathbb{R}^N`}</TeX>.
    In the case of the grid view, the elements are sorted by proximity. The shape of the borders can also indicate the proximity of a group: more vertical borders indicate a greater distance between the two groups.</div>,
    "intro-10-2":<div>When both colorings are proposed, the color of the border between two groups on the distance coloring provides additional information on the structure of the data in <TeX>{`\\mathbb{R}^N`}</TeX>.
    For both methods, a group with a clear/yellow border with another indicates greater proximity to the other groups.
    </div>,
    "intro-12-1":<div>
    <b>T3: Find the topology of the data in <TeX>{`\\mathbb{R}^N`}</TeX></b><br/><br/>

    For this task, we will consider that the generated data will consist of either 5 or 7 groups for each question.
    Some questions will have only the label coloring, others will offer both colorings on the screen.<br/>

    The goal of this task is to find the topology of the data in <TeX>{`\\mathbb{R}^N`}</TeX> using the proposed projection.
    Each topology will be represented by a diagram.
    Their meaning can be recalled by passing the mouse cursor without clicking over the diagram.
    If you hesitate between several answers, choose the topology that you think is best represented on the visualization.
    The possible characteristics are :
            </div>,
    "intro-12-2":<span>"Split": The groups are more or less separated from each other in <TeX>{`\\mathbb{R}^N`}</TeX> : </span>,
    "intro-12-3":<span>"Bubble": There is at least one group positioned inside another without mixing or overlapping in <TeX>{`\\mathbb{R}^N`}</TeX> : </span>,
    "intro-12-4":<span>"Mix": There are at least two groups that mix or overlap in <TeX>{`\\mathbb{R}^N`}</TeX> : </span>,
    "intro-12-5":<span>"Close": there are at least two groups that are significantly closer to each other in <TeX>{`\\mathbb{R}^N`}</TeX> than the others: </span>,
    "intro-14":<div>
    <b>T4: Count the number of outliers in a given group</b><br/><br/>
    For this task, we will consider that there are either 5 or 7 groups for each question.
    Only the coloring by label will be proposed on the screen.<br/>
    To answer this question, find the number of elements whose label is different from its neighbors within the requested group.
    As mentioned at the beginning of the introduction, some elements (including outliers) may be partially hidden by others.
    You will have to pay attention to these when answering the questions.
    The answer is to be given by using the keyboard on the screen, then clicking on NEXT.
    If you make a mistake, clicking on CANCEL deletes the current answer.
    </div>,
    "intro-16":<div>
    As mentioned earlier, you have 60 seconds to answer each question. When the time is up, the last answer you selected will be saved.
    At the beginning of each task, you have a break time as long as you wish.
    Finally, the questions will be spaced at 2 second intervals.
    
    Now that the explanations are complete, you can click on Start to begin the assessment. 
    </div>,
    "end-1":" The evaluation is now complete, thank you very much for your participation. ",
    "end-2":"We would now like to have your feedback on your use of the different projection and coloring methods. We have therefore prepared a survey to collect your remarks on this link: ",
    "end-3":"An ID should be pre-populated for the first field, to link your answers on the evaluation to the survey. If it is not, the identifier to be filled in on the first field is: ",
    "download-answers":"Download answers",
    "next-question-1":"Next question in ",
    "next-question-2":"second",
    }

    public static englishAnswers : LocaleTextOnly = {
        "red":"red",
        "blue":"blue",
        "green":"green",
        "purple":"purple",
        "orange":"orange",
        "yellow":"yellow",
        "brown":"brown",
        "pink":"pink",
        "gray":"gray",
        "split":"split",
        "bubble":"bubble",
        "mix":"mix",
        "close":"close",
        "title-split":"'Split' : Groups are more or less separated from each other in R^N",
        "title-bubble":"'Bubble' : There is at least one group positioned within another without mixing or overlapping in R^N",
        "title-mix":"'Mix' : There are at least two groups that mix or overlap in R^N",
        "title-close":"'Close' : There are at least two groups that are significantly closer to each other in R^N than to the others",
        "proceed":"Proceed",
        "next":"Next",
        "cancel":"Cancel",
        "alert-correct-1":"Correct ! Click on Next to proceed to the next task.",
        "alert-correct-2":"Correct! Click Next to proceed to the next test.",
        "alert-incorrect":"Incorrect ! The correct answer is ",
        "back-to-intro":"Back to explanations"
    }

    public static englishPath: LocaleTextOnly = {
        "intro-0": "intro/en/pipeline-proj.png",
        "intro-1": "intro/en/pipeline-col.png",
        "intro-2-1": "intro/en/pipeline-dist.png",
        "intro-2-2": "intro/en/knn.png",
        "intro-3": "intro/en/dist-usage-tsne.png",
        "intro-4": "intro/en/dist-usage-ssm.png",
        "intro-5": "intro/en/struct-overview.png",
        "intro-6-1":"intro/tsneGT-out.png",
        "intro-6-2": "intro/ssmGT-out.png",
        "legend": "./intro/en/legend.png"
    }
    
    public static getText(id: string) {
        switch (this.currentLocale) {
            case Locale.French:
                return this.frenchLocale[id];
                break;
            default:
                return this.englishLocale[id];
                break;

        }
    }

    public static getPath(id: string) {
        switch (this.currentLocale) {
            case Locale.French:
                return this.frenchPath[id];
                break;
            default:
                return this.englishPath[id];
                break;

        }
    }

    public static getAnswerText(id: string) {
        switch (this.currentLocale) {
            case Locale.French:
                return this.frenchAnswers[id];
                break;
            default:
                return this.englishAnswers[id];
                break;

        }
    }
}