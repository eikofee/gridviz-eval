import React from "react";
import Cookies from "universal-cookie";
import { EvalControllerComponent } from "./EvalControllerComponent";
import { TrainingComponent } from "./TrainingComponent";
import { Button, Col, Container, Nav, Row, Stack } from "react-bootstrap"
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';


interface IProps {
    master: EvalControllerComponent;
    pageInit: number;
}

interface IState {
    page: number;
}

export class IntroComponent extends React.Component<IProps, IState> {
    public canSkipT1 = false;
    public canSkipT2 = false;
    public canSkipT3 = false;
    public canSkipT4 = false;
    public canSkipT5 = false;

    constructor(props: any) {
        super(props);
        this.state = {
            page:props.pageInit
        };

    }

    nextPage(ic: IntroComponent) {
        ic.setState({
            page: ic.state.page + 1
        })

        let cookies = new Cookies()
        cookies.set("currentSlide", ic.state.page + 1)
    }
    
    prevPage(ic: IntroComponent) {
        ic.setState({
            page: ic.state.page - 1
        })

        let cookies = new Cookies()
        cookies.set("currentSlide", ic.state.page - 1)
    }

    skipToEnd(ic : IntroComponent) {
        ic.setState({
            page: 14
        })
    }

    render(): React.ReactNode {
        let training = false;
        let trainingPhase = "";
        let prevLabel = "Précédent";
        switch(this.state.page) {
            case 10:
                prevLabel = "Recommencer entraînement T1";
                break;
            case 12:
                prevLabel = "Recommencer entraînement T2";
                break;
            case 14:
                prevLabel = "Recommencer entraînement T3";
                break;
            case 16:
                prevLabel = "Recommencer entraînement T4";
                break;
        }
        let title = <Row className="justify-content-center"><Col className="col-auto">Introduction ({this.state.page +1 }/16)</Col></Row>
        let nav = <Row>
            <Col className="col-auto me-auto">
                <Button variant={this.state.page > 0 ? "primary" : "primary disabled"} onClick={() => this.prevPage(this)}>
                    {prevLabel}
                </Button>
            </Col>
            <Col className="col-auto">
                <Button variant="primary" className="ms-auto" onClick={() => this.nextPage(this)}>Suivant</Button>
            </Col>
        </Row>
        let text = <div></div>
        console.log(this.state.page)
        switch(this.state.page) {
            case 0:
                training = false;
                text =
                    <div>
                    <div>
                        Cette évaluation porte sur la représentation de données en hautes dimensions <TeX >R^N</TeX> sur un écran.
                        Plus précisément, nous évaluons l’efficacité de deux représentations pour des tâches communément effectuées lors de la visualisation de telles données.
                        Nous visualiserons plusieurs jeux de données pendant cette évaluation, et une étiquette est attribuée à chaque élément le groupe de données auquel il appartient.
                    </div>
                    <div>
                        Les deux méthodes de projections évaluées sont (1) une méthode de projection non-linéaire sur un espace <TeX>R^2</TeX> continu qu'on appelera "projection classique" (en haut sur le diagramme) et une méthode qui projette sur une grille compacte qu’on appellera "projection compacte" (en bas sur le diagramme).
                        Les deux projections font en sorte de représenter le jeu de données de façon à ce que les éléments qui sont proches dans <TeX>R^N</TeX> le soient aussi sur la vue 2D.
                    </div>
                    <Row className="justify-content-center">
                        <Image className="col-8" fluid src="intro/pipeline-proj.png" />
                    </Row>
                    </div>
            break;
            case 1:
                training = false;
                text = <div>
                    <div>
                        Dans ces deux méthodes, chaque carré représente un élément du jeu de données projeté.
                        En plus des deux méthodes de projections, nous proposons aussi deux colorations de ces carrés.
                    </div>
                    <div>
                        La première concerne les étiquettes : chaque étiquette dans le jeu de données se voit attribuée une couleur distincte des autres. 
                        Chaque élément est ensuite colorié par rapport à son étiquette.
                        La signification derrière les étiquettes importe peu dans cette évaluation, mais faire la distinction entre deux éléments par rapport à leur étiquette est important.
                    </div>
                    <Row className="justify-content-center">
                        <Image fluid className="col-8" src="intro/pipeline-col.png" />
                    </Row>
                </div>
                break;
            case 2:
                training = false;
                text = <div>
                    <div>
                        La seconde concerne la proximité des éléments dans <TeX>R^N</TeX>. Elle a pour objectif de donner des indications sur la topologie des éléments dans <TeX>R^N</TeX> en se basant sur le voisinage des éléments dans <TeX>R^2</TeX>.
                    </div>
                    <Row className="justify-content-center">
                        <Image fluid className="col-8" src="intro/pipeline-dist.png" />
                    </Row>
                    <div>
                        Cette coloration se calcule en deux étapes. La première consiste à récupérer les voisins de chaque éléments à partie de la projection <TeX>R^2</TeX>.
                        Le voisinage d'un élément <TeX>e</TeX> correspond aux plus proches éléments dans chaque secteur angulaire autour de <TeX>e</TeX>.
                        Ici, nous considérons 8 secteurs angulaires pour calculer le voisinage.
                    </div>
                    <Row className="justify-content-center">
                        <Image fluid className="col-5" src="intro/knn.png" />
                    </Row>
                    
                </div>
                break;
            case 3:
                text = <div>
                    <div>
                    Après avoir déterminé le voisinage <TeX>V(e)</TeX> d’un élément <TeX>e</TeX>, on calcule la moyenne des distances <TeX>{'\\overline{d}=\\frac{\\sum_{k \\in V(e)}|e-k|}{8}'}</TeX> entre <TeX>e</TeX> et ses voisins <TeX>k \in V(e)</TeX>. Une couleur est attribuée au carré pour représenter cette valeur.
                    L’échelle de couleurs n’est pas linéaire, mais de manière générale, les distances courtes dans <TeX>R^N</TeX> sont représentées par la couleur jaune/verte et les distances longues sont représentées par la couleur verte foncée/bleue foncée.
                    Pour chaque projection utilisant cette méthode de coloration, l’échelle des couleurs sera donnée en légende.
                </div>
                <div>
                    Cette coloration permet entre autres de comparer la proximité de deux éléments, et donc de représenter une partie de la topologie des données de <TeX>R^N</TeX> sur une projection <TeX>R^2</TeX>. Par exemple, dans ce cas de figure :
                </div>
                <Row className="justify-content-center">
                <Image fluid className="col-8" src="intro/dist-usage-tsne.png" />
                </Row>
                <div>Nous cherchons à déterminer le groupe le plus proche de <TeX>B</TeX>. On compare alors la couleur des éléments de <TeX>B</TeX> qui forment la frontière avec <TeX>A</TeX> et <TeX>C</TeX> pour connaître la distance qui les sépare. Les éléments représentant la distance <TeX>{'d_{AB}'}</TeX> sont de couleur bleue foncée et ceux qui représentent la distance <TeX>{'d_{BC}'}</TeX> sont de couleur verte. On peut donc en conclure que dans <TeX>R^N</TeX>, le groupe <TeX>B</TeX> est plus proche du groupe <TeX>C</TeX> que du groupe <TeX>A</TeX>.</div>
                </div>
                break;
            case 4:
                text= <div>
                    <div>
                        Autre exemple d'utilisation mais en utilisant cette fois-ci la vue par grille, on cherche une nouvelle fois à trouver quel groupe est plus proche de <TeX>B</TeX>. On compare les couleurs des frontières avec <TeX>A</TeX> et <TeX>C</TeX> pour trouver celle qui indique une distance courte avec <TeX>B</TeX>. Les éléments de la distance <TeX>{'d_{AB}'}</TeX> sont de couleur bleue foncée et ceux qui représentent la distance <TeX>{'d_{BC}'}</TeX> sont de couleur verte. On peut donc en conclure que dans <TeX>R^N</TeX>, le groupe <TeX>B</TeX> est plus proche du groupe <TeX>C</TeX> que du groupe <TeX>A</TeX>.
                    </div>
                    <Row className="justify-content-center">
                <Image fluid className="col-8" src="intro/dist-usage-ssm.png" />
                </Row>
                </div>
                break;
            case 5:
                training = false;
                text = <div>
                    <div>
                        Dans cette évaluation, nous générons des jeux de données dans <TeX>R^N</TeX> qui suivent des topologies et caractéristiques particulières.
                        Nous générons en l'occurence 4 types de structures topologique:
                        <ul>
                            <li>La première, nommée "partagée", est formée de groupes plus ou moins séparés les uns des autres.</li>
                            <li>La seconde, nommée "bulle", est formée d'un groupe qui est complètement intégré dans un autre, sans superposition à l'intérieur.</li>
                            <li>La troisième, nommée "mélange", est formée d'un groupe qui se superpose partiellement avec un autre.</li>
                            <li>La quatrième, nommée "proche", est formée d'au moins deux groupes significativement proches l'un de l'autre par rapport aux </li>autres.
                        </ul>
                        En plus de ces topologies, nous pouvons faire varier le nombre de groupes, leurs densités, distances par rapport aux autres groupes, etc...
                        Le diagramme ci-dessous donne un exemple de telles données générées en <TeX>R^2</TeX>. </div>
                        <Row className="justify-content-center">
                            <Image fluid className="col-8" src="intro/struct-overview.png" />
                    </Row>

                        <div> Les données générées pour l'évaluation sont dans des espaces à plus de deux dimensions.
                        Dans cette évaluation, nous cherchons à retrouver ces caractéristiques et topologies en employant les méthodes de projections et de coloration présentées précédemment.</div>
                        </div>
                break;
            case 6:
                text=<div>
                    Enfin, une dernière caractéristique que l'on peut manipuler concerne les étiquettes des éléments. Certains éléments ayant une étiquette A peuvent être positionnés dans un groupe d'étiquette B, on appellera ces éléments des <b>intrus</b>.
                    Dans l'exemple ci-dessous, de tels éléments sont encadrés en rose.
                        
                    <Row className="justify-content-center">
                        <Col className="col-6 justify-content-center">
                            <Image fluid src="intro/tsneGT-out.png" />
                        </Col>
                        <Col className="col-6 justify-content-center">
                            <Image fluid src="intro/ssmGT-out.png" />
                        </Col>
                    </Row>
                </div>
            break;

            case 7:
                training = false;
                text = <div>
                    <div>
                        Cette évaluation comporte 4 tâches différentes :<br/>
                        T1 : Trouver l'étiquette de groupe la plus représentée<br/>
                        T2 : Trouver quel groupe est plus proche d’un autre dans <TeX>R^N</TeX><br/>
                        T3 : Trouver la topologie des données dans <TeX>R^N</TeX><br/>
                        T4 : Compter le nombre d'intrus dans un groupe donné<br/><br/>
                    </div>
                    <div>
                        Ces tâches sont réparties en 82 questions. Les colorations utilisées diffèrent suivant les tâches proposées. Certaines questions sont volontairement difficiles et demandent donc du temps pour être répondues, vous disposez en revanche d'1 minute par question pour répondre.
                        A la fin du questionnaire, nous demanderons quelles stratégies vous aurez utilisé pour répondre aux questions.
                        Répondre correctement est plus profitable que répondre rapidement, surtout pour la tâche T4.<br/>
                        Nous allons à présent montrer comment répondre aux différentes tâches.
                    </div>
                </div>
                break;
            case 8:
                training = false;
                text = <div>

                <b>T1 : Trouver l'étiquette la plus représentée</b><br/><br/>

                Pour cette tâche, il y aura des données composées avec entre 3 et 6 groupes différents pour chaque question.
                Seule la coloration par étiquette sera utilisée.
                La tâche consiste à choisir la couleur de l'étiquette qui semble être la plus représentée (plus nombreuse) à l’écran.
                </div>
                break;
            case 9:
                training = true;
                trainingPhase = "t1"
                break;
            case 10:
                training = false;
                text = <div>
                <b>T2 : Trouver quel groupe est plus proche d’un autre dans <TeX>R^N</TeX></b><br/><br/>

                Pour cette tâche, nous considérerons qu’il y a soit 5, soit 7 groupes à chaque question.
                Des questions n'auront que la coloration par étiquette, d'autres proposeront les deux colorations à l’écran.<br/>
                Nous désignerons un groupe par sa couleur, et nous demanderons de désigner un autre groupe par sa couleur qui semble être le plus proche de celui demandé. <br/>
                Lorsque seule la coloration par étiquette est proposée, il faut trouver des indices montrant que les groupes sont proches dans <TeX>R^N</TeX>.
                Dans le cas de la vue par partitionnement, des éléments peuvent légèrement être rapprochés d'un autre groupe pour indiquer leur proximité dans <TeX>R^N</TeX>.
                Dans le cas de la vue par grille, les éléments sont triés par proximité. La forme des frontières peut donner un indice sur la proximité d'un groupe: les frontières plus verticales indiquent une plus grande distance entre les deux groupes.
                <Row className="justify-content-center">
                        <Col className="col-4 justify-content-center"><Image fluid src="intro/t3-prox.png" /></Col>
                        <Col className="col-4 justify-content-center"><Image fluid src="intro/t3-sep.png" /></Col>
                </Row>
                Lorsque les deux colorations sont proposées, la proximité est alors définie par la couleur de la frontière entre deux groupes sur la coloration par distances.
                Pour les deux méthodes, il faudra donc sélectionner le groupe ayant une frontière la plus claire/jaune de celle du groupe demandé. <br/>
                </div>
                break;
            case 11:
                training = true;
                trainingPhase = "t2"
                break;
            case 12:
                training = false;
                text = <div>
            <b>T3 : Trouver la topologie des données dans <TeX>R^N</TeX></b><br/><br/>

            Pour cette tâche, nous considèrerons qu’il y a soit 5, soit 7 groupes à chaque question.
            Des questions n'auront que la coloration par étiquette, d'autres proposeront les deux colorations à l’écran.<br/>
            Chaque jeu de données projeté aura une topologie aillant une et une seule caractéristique parmi celle qui sont présentées ci-dessous.
            L’objectif de la question est d’indiquer quelle est la caractéristique du jeu de données dans <TeX>R^N</TeX>.
            Chaque caractéristique, et donc réponse, sera représentée par un diagramme.
            Leur signification peut être rappelée en passant le curseur de la souris sans cliquer par-dessus le diagramme.
            Les caractéristiques possibles sont :<br/>
            1.Tous les groupes sont bien écartés les uns des autres dans <TeX>R^N</TeX>. <img className="answer-image" src="ans/struct1.png" /><br/>
            2.Il y a au moins un groupe positionné à l’intérieur d’un autre sans se mélanger/se superposer dans <TeX>R^N</TeX> (une sorte de "bulle").<img className="answer-image" src="ans/struct2.png" /><br/>
            3.Il y a au moins deux groupes qui se mélangent/se superposent dans <TeX>R^N</TeX>.<img className="answer-image" src="ans/struct3.png" /><br/>
            4.Il y a au moins deux groupes sont plus proches entre eux dans <TeX>R^N</TeX> par rapport aux autres.<img className="answer-image" src="ans/struct4.png" /><br/>
            </div>
            break;
            case 13:
                training = true;
                trainingPhase = "t3"
                break;
            case 14:
                training = false;
                text = <div>
                    <b>T4 : Trouver le nombre d'intrus dans les données</b><br/><br/>
                    Pour cette tâche, nous considèrerons qu’il y a soit 5, soit 7 groupes à chaque question.
                    Seule la coloration par étiquette sera proposée à l'écran.<br/>
                    Pour répondre à cette question, il faut trouver le nombre d’éléments dont l'étiquette est différent de ses voisins au sein du groupe demandé.
                    La réponse est à donner en utilisant le clavier à l’écran, puis en cliquant sur SUIVANT.
                    En cas d’erreur, cliquer sur ANNULER efface la réponse en cours.
                </div>
                break;
            case 15:
                training = true;
                trainingPhase = "t4"
                break;
            case 16:
                training = false;
                text = <div>
                    Les explications sont maintenant terminées, vous pouvez cliquer sur Commencer pour commencer l'évaluation. 
                </div>
                break;
            case 17:
                this.props.master.endIntro(this.props.master);
                return null;
                break;
        }

            return <Container className="d-flex flex-column h-75">
            <Row>{title}</Row>
            <Row>{text}</Row>
            {training ? <TrainingComponent case={trainingPhase} key={trainingPhase} master={this} canSkip={false}/> : <Row>{nav}</Row>}
            </Container>
        }
}