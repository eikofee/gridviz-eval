import React from "react";
import Cookies from "universal-cookie";
import { EvalControllerComponent } from "./EvalControllerComponent";
import { TrainingComponent } from "./TrainingComponent";

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
            page: 17
        })
    }

    render(): React.ReactNode {
        let base = <div className="question-number">
            Introduction ({this.state.page +1}/16)
            </div>
        switch(this.state.page) {
            case 0:
                return [base, <div className="intro-text">
                    Cette évaluation porte sur la représentation de données en hautes dimensions RN sur un écran.
                    Plus précisément, nous évaluons l’efficacité de deux représentations pour des tâches communément effectuées lors de la visualisation de telles données.
                    Nous visualiserons plusieurs jeux de données pendant cette évaluation, et une étiquette est attribuée à chaque élément du jeu de données, qui sert à identifier le groupe de données auquel il appartient.
                    <br/>
                    Les deux méthodes de projections évaluées sont (1) une méthode de clustering sur un espace 2D continu qu'on appelera "méthode par partitionnement" (en haut sur le diagramme) et une méthode qui projette sur une grille 2D compacte qu’on appellera "méthode par grille" (en bas sur le diagramme).
                    Les deux projections font en sorte de représenter le jeu de données de façon à ce que les éléments qui sont proches dans RN le soient aussi sur la vue 2D.
                    <div>
                        <img src="intro/pipeline-proj.png" />
                    </div>
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Suivant</div>
                    <div className="control-cancel" onClick={() => this.skipToEnd(this)}>Skip</div>
                </div>]
                break;
            case 1:
                return [base, <div className="intro-text">

                Dans ces deux méthodes, chaque carré représente un élément du jeu de données projeté.
                En plus des deux méthodes de projections, nous proposons aussi deux formes de colorisation de ces carrés.

                La première concerne les étiquettes : chaque étiquette dans le jeu de données se voit attribuée une couleur distincte des autres. 
                Chaque élément est ensuite colorié par rapport à son étiquette.
                La signification derrière les étiquettes importe peu dans cette évaluation, mais faire la distinction entre deux éléments par rapport à leur étiquette est important.
                    <div>
                        <img src="intro/pipeline-col.png" />
                    </div>
                    <div className="control-cancel" onClick={() => this.prevPage(this)}>Précédent</div>
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Suivant</div>
                </div>]
                break;
            
            case 2:
                return [base, <div className="intro-text">

                    La seconde concerne le positionnement dans RN des éléments : dans les deux projections, le voisinage de chaque élément est inspecté.
                    Le calcul du voisinage est différent en fonction de la projection étudiée:
                    <ul>
                        <li>Dans la projection par partitionnement, le voisinage d'un élément correspond aux points les plus proches dans 6 directions autour de celui-ci (s'ils existent).</li>
                        <li>Dans la projection par grille, le voisinage d'un élément correspond aux éléments dans les 8 cellules adjacentes autour de lui (s'ils existent).</li>
                    </ul>
                    Après avoir déterminé le voisinage d’un élément, on calcule la moyenne des distances dans RN de l’élément avec chacun de ceux de son voisinage, et une couleur est attribuée au carré pour représenter cette distance moyenne.
                    L’échelle de couleurs n’est pas forcément linéaire, mais de manière générale, les distances faibles dans RN sont représentées par la couleur jaune/vert et les distances élevées sont représentées par la couleur vert foncé/bleu foncé.
                    Pour chaque projection utilisant cette méthode de coloration, l’échelle des couleurs sera donnée en légende.
                    <div>
                        <img className="large-img" src="intro/pipeline-dist.png" />
                    </div>
                    <div className="control-cancel" onClick={() => this.prevPage(this)}>Précédent</div>
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Suivant</div>
                </div>]
                break;

            case 3:
                return [base, <div className="intro-text">

                    Les données projetées dans cette évaluation ont des structures différentes, composées de plusieurs groupes partageant une étiquette commune.
                    Ces groupes peuvent plus ou moins se superposer entre eux, varier en densité, en taille et en cohérence.
                    Certains éléments ayant une étiquette A peuvent être positionnés dans un groupe d'étiquette B, on appellera ces éléments des <b>outliers</b> et doivent être considérées comme des incohérences dans le traitement du jeu de données.
                    Dans l'exemple ci-dessous, de tels éléments sont encadrés en rose.
                    <div>
                        <img src="intro/tsneGT-out.png" />
                        <img src="intro/ssmGT-out.png" />
                    </div>
                    <div className="control-cancel" onClick={() => this.prevPage(this)}>Précédent</div>
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Suivant</div>
                </div>]
                break;

            case 4:
                return [base, <div className="intro-text">

                    Cette évaluation comporte 5 tâches différentes :<br/>
                    T1 : Déterminer le nombre d'étiquettes différentes<br/>
                    T2 : Trouver l'étiquette la plus représentée<br/>
                    T3 : Trouver quel groupe est plus proche d’un autre dans RN<br/>
                    T4 : Trouver la structure des données dans RN<br/>
                    T5 : Compter le nombre « d'outliers » dans un cluster<br/><br/>

                    A part la tâche T1 qui en possède le double, chacune de ces tâches aura 16 questions : 8 questions utilisant la projection scatter plot, 8 questions utilisant la projection grille. Les colorations utilisées diffèrent suivant les tâches proposées. Certaines questions sont volontairement difficiles et demandent donc du temps pour être répondues. A la fin du questionnaire, nous demanderons quelles stratégies vous aurez utilisé pour répondre aux questions.<br/>
                    Nous allons à présent montrer comment répondre aux différentes tâches.
                    <div className="control-cancel" onClick={() => this.prevPage(this)}>Précédent</div>
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Suivant</div>
                </div>]
                break;
            case 5:
                return [base, <div className="intro-text">

                <b>T1 : Déterminer le nombre d'étiquettes différentes</b><br/><br/>
                Les deux méthodes de colorations seront utilisées de façon indépendante l'une de l'autre.<br/>
                <i>Coloration par étiquette</i><br/>
                Pour répondre à cette question, quel que soit la méthode de projection utilisée, il faut compter le nombre de couleurs différentes à l’écran.
                La réponse est à donner en utilisant le clavier à l’écran, puis en cliquant sur SUIVANT.
                En cas d’erreur, cliquer sur ANNULER efface la réponse en cours.<br/>
                <div>
                        <img src="intro/tsneGT-t1.png" />
                        <img src="intro/ssmGT-t1.png" />
                </div>
                <div className="green-text">
                    <b>Réponse : 7</b>
                </div>
                <div className="control-cancel" onClick={() => this.prevPage(this)}>Précédent</div>
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Suivant</div>
                </div>
                ]
                break;
            case 6:
            return [base, <div className="intro-text">

                <b>T1 : Déterminer le nombre d'étiquettes différentes</b><br/><br/>
                Les deux méthodes de colorations seront utilisées de façon indépendante l'une de l'autre.<br/>,
                <i>Coloration par distances</i><br/>
                Nous savons que les groupes regroupent des éléments partageant en majorité une étiquette commune.
                Nous savons aussi que ces groupes sont composés d'éléments étant proches les uns des autres dans RN.
                Nous pouvons donc considérer qu’un ensemble d’éléments proches les uns des autres sur la visualisation forment un groupe et donc ont une étiquette commune.
                Cette notion de proximité peut être variable suivant les groupes car leur densité n’est pas forcément la même partout.
                Il faut donc se concentrer sur les délimitations bien contrastées entre les groupes.
                Attention, certaines séparations peuvent être plus subtiles.
                <div>
                        <img src="intro/tsneDist-t1.png" />
                        <img src="intro/ssmDist-t1.png" />
                </div>
                <div className="green-text">
                    <b>Réponse : 7</b>
                </div>

                    <div className="control-cancel" onClick={() => this.prevPage(this)}>Précédent</div>
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Entraînement</div>
                </div>]
                break;
            case 7:
                return [base, <TrainingComponent case="t1" key="t1" master={this} canSkip={this.canSkipT1}/>]
                break;
            case 8:
                this.canSkipT1 = true;
                return [base, <div className="intro-text">

                <b>T2 : Trouver l'étiquette la plus représentée</b><br/><br/>

                Pour cette tâche, nous considèrerons qu’il y a soit 5, soit 7 groupes différents à chaque question, des erreurs de projections peuvent venir perturber l’interprétation de la visualisation.
                Les deux colorations seront proposées à l’écran.
                Il faut choisir la couleur de l'étiquette qui semble être la plus représentée à l’écran.

                    <div className="control-cancel" onClick={() => this.prevPage(this)}>Précédent</div>
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Suivant</div>
                </div>]
                break;
            case 9:
                return [base, <TrainingComponent case="t2" key="t2" master={this} canSkip={this.canSkipT2}/>]
                break;
            case 10:
                this.canSkipT2 = true;
                return [base, <div className="intro-text">
                <b>T3 : Trouver quel groupe est plus proche d’un autre dans RN</b><br/><br/>

                Pour cette tâche, nous considérerons qu’il y a soit 5, soit 7 groupes à chaque question, des erreurs de projections peuvent venir perturber l’interprétation de la visualisation.
                Les deux colorations seront proposées à l’écran.<br/>
                Nous désignerons un groupe par sa couleur, et nous demanderons de désigner un autre groupe par sa couleur qui semble être le plus proche de celui demandé.
                Cette proximité sera définie par la couleur de la frontière entre deux groupes.
                Il faudra donc sélectionner le groupe ayant une frontière la plus claire/jaune de celle du groupe demandé. <br/>
                Si les groupes semblent tous éloignés les uns des autres dans RN, il faut alors sélectionner le bouton <img className="answer-image" src="ans/none.png" /> ***.
                    <div className="control-cancel" onClick={() => this.prevPage(this)}>Précédent</div>
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Suivant</div>
                </div>]
                break;
            case 11:
                return [base, <TrainingComponent case="t3" key="t3" master={this} canSkip={this.canSkipT3}/>]
                break;
            case 12:
                this.canSkipT3 = true;
            return [base, <div className="intro-text">
            <b>T4 : Trouver la structure des données dans RN</b><br/><br/>

            Pour cette tâche, nous considèrerons qu’il y a soit 5, soit 7 groupes à chaque question, des erreurs de projections peuvent venir perturber l’interprétation de la visualisation.
            Les deux colorations seront proposées à l’écran. <br/>
            Chaque jeu de données projeté aura une et une seule caractéristique parmi celle qui sont présentées ci-dessous.
            L’objectif de la question est d’indiquer quelle est la caractéristique du jeu de données dans RN.
            Chaque caractéristique, et donc réponse, sera représentée par un diagramme.
            Leur signification peut être rappelée en passant le curseur de la souris sans cliquer par-dessus le diagramme.
            Les <b>outliers</b> ne doivent pas être considérer pour trouver la caractéristique du jeu de données. <br/>
            Les caractéristiques possibles sont :<br/>
            1.Tous les groupes sont bien écartés les uns des autres dans RN. <img className="answer-image" src="ans/struct1.png" /><br/>
            2.Il y a au moins un groupe positionné à l’intérieur d’un autre sans se mélanger/se superposer dans RN (une sorte de "bulle").<img className="answer-image" src="ans/struct2.png" /><br/>
            3.Il y a au moins deux groupes qui se mélangent/se superposent dans RN.<img className="answer-image" src="ans/struct3.png" /><br/>
            4.Il y a au moins deux groupes sont plus proches entre eux dans RN par rapport aux autres.<img className="answer-image" src="ans/struct4.png" /><br/>
                    <div className="control-cancel" onClick={() => this.prevPage(this)}>Précédent</div>
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Suivant</div>

            </div>]
            break;
            case 13:
                return [base, <TrainingComponent case="t4" key="t4" master={this} canSkip={this.canSkipT4}/>]
                break;
            case 14:
                this.canSkipT4 = true;
                return [base, <div className="intro-text">
                <b>T5 : Trouver le nombre d'outliers dans les données</b><br/><br/>
                Pour cette tâche, nous considèrerons qu’il y a soit 5, soit 7 groupes à chaque question, des erreurs de projections peuvent venir perturber l’interprétation de la visualisation.
                Les deux colorations seront proposées à l’écran.<br/>
                Pour répondre à cette question, il faut trouver le nombre d’éléments dont l'étiquette est différent de ses voisins au sein du groupe demandé.
                Les éléments positionnés en bordure d’un cluster ne sont pas forcément à considérer comme <b>outliers</b>.
                Les outliers sont généralement proches des autres éléments dans RN, et donc cette distance peut être vérifiée sur la méthode de colorisation à l'écran.
                La réponse est à donner en utilisant le clavier à l’écran, puis en cliquant sur SUIVANT.
                En cas d’erreur, cliquer sur ANNULER efface la réponse en cours.
                    <div className="control-cancel" onClick={() => this.prevPage(this)}>Précédent</div>
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Suivant</div>
                </div>]
                break;
            case 15:
                return [base, <TrainingComponent case="t5" key="t5" master={this} canSkip={this.canSkipT5}/>]
                break;
            case 16:
                this.canSkipT5 = true;
                return [base, <div className="intro-text">
                    Les explications sont maintenant terminées, vous pouvez cliquer sur Commencer pour commencer l'évaluation. 
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Commencer</div>
                </div>]
            case 17:
                this.props.master.endIntro(this.props.master);
                return null;
                break;

        }
    }
}