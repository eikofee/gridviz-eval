import React from "react";
import Cookies from "universal-cookie";
import { EvalControllerComponent } from "./EvalControllerComponent";
import { TrainingComponent } from "./TrainingComponent";
import { Button, Col, Container, Nav, Row, Stack } from "react-bootstrap"
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css';

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
        let title = <Row className="justify-content-center"><Col className="col-auto">Introduction ({this.state.page +1 }/16)</Col></Row>
        let nav = <Row>
            <Col className="col-auto me-auto">
                <Button variant="outline-primary" onClick={() => this.prevPage(this)}>Précédent</Button>
            </Col>
            <Col className="col-auto">
                <Button variant="outline-primary" className="ms-auto" onClick={() => this.nextPage(this)}>Suivant</Button>
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
                        Cette évaluation porte sur la représentation de données en hautes dimensions RN sur un écran.
                        Plus précisément, nous évaluons l’efficacité de deux représentations pour des tâches communément effectuées lors de la visualisation de telles données.
                        Nous visualiserons plusieurs jeux de données pendant cette évaluation, et une étiquette est attribuée à chaque élément du jeu de données, qui sert à identifier le groupe de données auquel il appartient.
                    </div>
                    <div>
                        Les deux méthodes de projections évaluées sont (1) une méthode de clustering sur un espace 2D continu qu'on appelera "méthode par partitionnement" (en haut sur le diagramme) et une méthode qui projette sur une grille 2D compacte qu’on appellera "méthode par grille" (en bas sur le diagramme).
                        Les deux projections font en sorte de représenter le jeu de données de façon à ce que les éléments qui sont proches dans RN le soient aussi sur la vue 2D.
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
                        En plus des deux méthodes de projections, nous proposons aussi deux formes de colorisation de ces carrés.
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
                        La seconde concerne le positionnement dans RN des éléments : dans les deux projections, le voisinage de chaque élément est inspecté.
                        Le calcul du voisinage est différent en fonction de la projection étudiée:
                    </div>
                    <ul>
                        <li>Dans la projection par partitionnement, le voisinage d'un élément correspond aux points les plus proches dans 6 directions autour de celui-ci (s'ils existent).</li>
                        <li>Dans la projection par grille, le voisinage d'un élément correspond aux éléments dans les 8 cellules adjacentes autour de lui (s'ils existent).</li>
                    </ul>
                    <div>
                    Après avoir déterminé le voisinage d’un élément, on calcule la moyenne des distances dans RN de l’élément avec chacun de ceux de son voisinage, et une couleur est attribuée au carré pour représenter cette distance moyenne.
                    L’échelle de couleurs n’est pas forcément linéaire, mais de manière générale, les distances faibles dans RN sont représentées par la couleur jaune/vert et les distances élevées sont représentées par la couleur vert foncé/bleu foncé.
                    Pour chaque projection utilisant cette méthode de coloration, l’échelle des couleurs sera donnée en légende.
                    </div>
                    <Row className="justify-content-center">
                        <Image fluid className="col-8" src="intro/pipeline-dist.png" />
                    </Row>
                </div>
                break;

            case 3:
                training = false;
                text = <div>
                    <div>
                        Les données projetées dans cette évaluation ont des structures différentes, composées de plusieurs groupes partageant une étiquette commune.
                        Ces groupes peuvent plus ou moins se superposer entre eux, varier en densité, en taille et en cohérence.
                        Certains éléments ayant une étiquette A peuvent être positionnés dans un groupe d'étiquette B, on appellera ces éléments des <b>intrus</b>.
                        Dans l'exemple ci-dessous, de tels éléments sont encadrés en rose.
                    </div>
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

            case 4:
                training = false;
                text = <div>
                    <div>
                        Cette évaluation comporte 4 tâches différentes :<br/>
                        T1 : Trouver l'étiquette de groupe la plus représentée<br/>
                        T2 : Trouver quel groupe est plus proche d’un autre dans RN<br/>
                        T3 : Trouver la topologie des données dans RN<br/>
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
            case 5:
                training = false;
                text = <div>

                <b>T1 : Trouver l'étiquette la plus représentée</b><br/><br/>

                Pour cette tâche, il y aura entre 3 et 6 groupes différents à chaque question.
                Seule la coloration par étiquette sera utilisée.
                Il faut choisir la couleur de l'étiquette qui semble être la plus représentée (plus nombreuse) à l’écran.
                </div>
                break;
            case 6:
                training = true;
                trainingPhase = "t1"
                break;
            case 7:
                training = false;
                text = <div>
                <b>T2 : Trouver quel groupe est plus proche d’un autre dans RN</b><br/><br/>

                Pour cette tâche, nous considérerons qu’il y a soit 5, soit 7 groupes à chaque question.
                Des questions n'auront que la coloration par étiquette, d'autres proposeront les deux colorations à l’écran.<br/>
                Nous désignerons un groupe par sa couleur, et nous demanderons de désigner un autre groupe par sa couleur qui semble être le plus proche de celui demandé. <br/>
                Lorsque seule la coloration par étiquette est proposée, il faut trouver des indices montrant que les groupes sont proches dans RN.
                Dans le cas de la vue par partitionnement, des éléments peuvent légèrement être rapprochés d'un autre groupe pour indiquer leur proximité dans RN.
                Dans le cas de la vue par grille, les éléments sont triés par proximité. La forme des frontières peut donner un indice sur la proximité d'un groupe: les frontières plus verticales indiquent une plus grande distance entre les deux groupes.
                <Row className="justify-content-center">
                        <Col className="col-4 justify-content-center"><Image fluid src="intro/t3-prox.png" /></Col>
                        <Col className="col-4 justify-content-center"><Image fluid src="intro/t3-sep.png" /></Col>
                </Row>
                Lorsque les deux colorations sont proposées, la proximité est alors définie par la couleur de la frontière entre deux groupes sur la coloration par distances.
                Pour les deux méthodes, il faudra donc sélectionner le groupe ayant une frontière la plus claire/jaune de celle du groupe demandé. <br/>
                </div>
                break;
            case 8:
                training = true;
                trainingPhase = "t2"
                break;
            case 9:
                training = false;
                text = <div>
            <b>T3 : Trouver la topologie des données dans RN</b><br/><br/>

            Pour cette tâche, nous considèrerons qu’il y a soit 5, soit 7 groupes à chaque question.
            Des questions n'auront que la coloration par étiquette, d'autres proposeront les deux colorations à l’écran.<br/>
            Chaque jeu de données projeté aura une topologie aillant une et une seule caractéristique parmi celle qui sont présentées ci-dessous.
            L’objectif de la question est d’indiquer quelle est la caractéristique du jeu de données dans RN.
            Chaque caractéristique, et donc réponse, sera représentée par un diagramme.
            Leur signification peut être rappelée en passant le curseur de la souris sans cliquer par-dessus le diagramme.
            Les caractéristiques possibles sont :<br/>
            1.Tous les groupes sont bien écartés les uns des autres dans RN. <img className="answer-image" src="ans/struct1.png" /><br/>
            2.Il y a au moins un groupe positionné à l’intérieur d’un autre sans se mélanger/se superposer dans RN (une sorte de "bulle").<img className="answer-image" src="ans/struct2.png" /><br/>
            3.Il y a au moins deux groupes qui se mélangent/se superposent dans RN.<img className="answer-image" src="ans/struct3.png" /><br/>
            4.Il y a au moins deux groupes sont plus proches entre eux dans RN par rapport aux autres.<img className="answer-image" src="ans/struct4.png" /><br/>
            </div>
            break;
            case 10:
                training = true;
                trainingPhase = "t3"
                break;
            case 11:
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
            case 12:
                training = true;
                trainingPhase = "t4"
                break;
            case 13:
                training = false;
                text = <div>
                    Les explications sont maintenant terminées, vous pouvez cliquer sur Commencer pour commencer l'évaluation. 
                </div>
                break;
            case 14:
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