import React from "react";
import { EvalControllerComponent } from "./EvalControllerComponent";
import { TrainingComponent } from "./TrainingComponent";

interface IProps {
    master: EvalControllerComponent;
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
            page:0
        };

    }

    nextPage(ic: IntroComponent) {
        ic.setState({
            page: ic.state.page + 1
        })
    }

    prevPage(ic: IntroComponent) {
        ic.setState({
            page: ic.state.page - 1
        })
    }

    skipToEnd(ic : IntroComponent) {
        ic.setState({
            page: 17
        })
    }

    render(): React.ReactNode {
        let base = <div className="question-number">
            Evaluation utilisateur sur les méthodes de projections 2D et en grille.
            </div>
        switch(this.state.page) {
            case 0:
                return [base, <div className="intro-text">
                    Cette évaluation porte sur la représentation de données en hautes dimensions RN sur un écran. Plus précisément, nous évaluons l’efficacité de deux représentations pour des tâches communément effectuées lors de la visualisation de telles données. Nous visualiserons plusieurs jeux de données pendant cette évaluation, et chaque élément du jeu de donnée se verra attribué un label, qui sera une valeur à part de la position de la donnée dans l’espace RN.
                    <br/>
                    Ces deux méthodes de visualisation sont une méthode de clustering affichée sur un espace continu qu’on appellera "méthode scatter plot" (à gauche) et une méthode en grille compacte qu’on appellera "méthode grille" (à droite). Les deux projections font en sorte de représenter le jeu de données de façon que les éléments qui sont proches dans RN le soient aussi à l’écran.
                    <div>
                        <img src="intro/tsneGT.png" />
                        <img src="intro/ssmGT.png" />
                    </div>
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Suivant</div>
                    <div className="control-cancel" onClick={() => this.skipToEnd(this)}>Skip</div>
                </div>]
                break;
            case 1:
                return [base, <div className="intro-text">

                Dans ces deux méthodes, chaque carré représente un élément du jeu de données projeté. En plus des deux méthodes de projections, nous proposons aussi deux formes de colorisation de ces carrés.

                La première concerne les labels : chaque label dans le jeu de données se voit attribué une couleur distincte des autres. Chaque élément est donc colorié par rapport à son label. La signification derrière les labels importe peu, mais faire la distinction entre deux éléments par rapport à leur label est important. (image deux projs GT + légende)
                    <div>
                        <img src="intro/tsneGT.png" />
                        <img src="intro/ssmGT.png" />
                    </div>
                    <div className="control-cancel" onClick={() => this.prevPage(this)}>Précédent</div>
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Suivant</div>
                </div>]
                break;
            
            case 2:
                return [base, <div className="intro-text">

                    La seconde concerne le positionnement dans RN des éléments : dans les projections scatter plot et grille, le voisinage de chaque élément est inspecté. Le calcul du voisinage est différent en fonction de la projection étudiée, et est présentée dans l’image ci-dessous.
                    <div>
                        <img src="intro/tsneDist.png" />
                        <img src="intro/ssmDist.png" />
                    </div>
                    Après avoir déterminé le voisinage d’un élément, on calcule la moyenne des distances dans RN de l’élément avec chacun de ceux de son voisinage, et on colorie le carré pour représenter cette distance. Il est important de noter que l’échelle de couleur n’est pas linéaire, mais de manière générale, les distances faibles sont représentées par la couleur jaune/vert et les distances élevées sont représentées par la couleur vert foncé/bleu foncé. Pour chaque projection utilisant cette méthode de coloration, l’échelle des couleurs sera donnée en légende.
                    <div className="control-cancel" onClick={() => this.prevPage(this)}>Précédent</div>
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Suivant</div>
                </div>]
                break;

            case 3:
                return [base, <div className="intro-text">

                    Les données projetées dans cette évaluation ont des structures différentes, mais elles sont formées de plusieurs clusters partageant un label commun. Ces clusters peuvent plus ou moins se superposer entre eux, varier en densité, taille et cohérence. Certains éléments d’un label peuvent être positionnés dans un cluster d’un autre label, on appellera ces éléments des <b>outliers</b> et doivent être considérées comme des incohérences dans le traitement du jeu de données.
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
                    T1 : Déterminer le nombre de labels différents<br/>
                    T2 : Trouver le label majoritaire dans le jeu de données<br/>
                    T3 : Trouver quel cluster est plus proche d’un autre dans RN<br/>
                    T4 : Trouver quelle forme les données ont dans RN<br/>
                    T5 : Compter le nombre de « outliers » dans un cluster<br/><br/>

                    A part la tâche T1 qui en possède le double, chacune de ces tâches aura 16 questions : 8 questions utilisant la projection scatter plot, 8 questions utilisant la projection grille. Les colorations utilisées diffèrent suivant les tâches proposées. Certaines questions sont volontairement difficiles et demandent donc du temps pour être répondues. A la fin du questionnaire, nous demanderons quelles stratégies vous aurez utilisé pour répondre aux questions.<br/>
                    Nous allons à présent montrer comment répondre aux différentes tâches.
                    <div className="control-cancel" onClick={() => this.prevPage(this)}>Précédent</div>
                    <div className="control-proceed" onClick={() => this.nextPage(this)}>Suivant</div>
                </div>]
                break;
            case 5:
                return [base, <div className="intro-text">

                <b>T1 : Déterminer le nombre de labels différents</b><br/><br/>
                Les deux méthodes de colorations seront utilisées de façon indépendante l'une de l'autre.<br/>
                <i>Coloration par label</i><br/>
                Pour répondre à cette question, quel que soit la méthode de projection utilisée, il faut compter le nombre de couleurs différentes à l’écran. La réponse est à donner en utilisant le clavier à l’écran, puis en cliquant sur SUIVANT. En cas d’erreur, vous pouvez cliquer sur ANNULER pour effacer la réponse en cours.<br/>
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

                <b>T1 : Déterminer le nombre de labels différents</b><br/><br/>
                Les deux méthodes de colorations seront utilisées de façon indépendante l'une de l'autre.<br/>,
                <i>Coloration par distances</i><br/>
                Nous savons que les clusters regroupent des éléments partageant en majorité un label commun. Les clusters sont des éléments étant proches les uns des autres dans RN. Nous pouvons donc considérer qu’un ensemble d’éléments proches les uns des autres sur la visualisation forment un cluster et donc un label commun. Cette notion de proximité peut être variable suivant les clusters car leur densité n’est pas forcément la même partout. Attention, certaines séparations peuvent être subtiles.
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

                <b>T2 : Trouver le label majoritaire dans le jeu de données</b><br/><br/>

                Pour cette tâche, nous considèrerons qu’il y a soit 5, soit 7 clusters à chaque question, des erreurs de projections peuvent venir perturber l’interprétation de la visualisation. Les deux colorations seront proposées à l’écran.
                Il faut choisir la couleur du cluster qui semble être la plus nombreuse à l’écran.

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
                <b>T3 : Trouver quel cluster est plus proche d’un autre dans RN</b><br/><br/>

                Pour cette tâche, nous considérerons qu’il y a soit 5, soit 7 clusters à chaque question des erreurs de projections peuvent venir perturber l’interprétation de la visualisation. Les deux colorations seront proposées à l’écran.<br/>
                Nous désignerons un cluster par sa couleur, et nous demanderons quel autre cluster se situe le plus proche du premier, en répondant avec la couleur de ce dernier. Cette proximité sera définie par la distance entre les deux frontières des deux clusters, les <b>outliers</b> ne doivent pas être considérés pour définir la frontière d’un cluster. Il faudra donc sélectionner le cluster ayant sa frontière la plus proche de celle du cluster demandé. <br/>
                Si les clusters semblent tous éloignés les uns des autres dans RN, il faut alors sélectionner le bouton <img className="answer-image" src="ans/none.png" />.
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
            <b>T4 : Trouver la forme des données dans RN</b><br/><br/>

            Pour cette tâche, nous considèrerons qu’il y a soit 5, soit 7 clusters à chaque question, des erreurs de projections peuvent venir perturber l’interprétation de la visualisation. Les deux colorations seront proposées à l’écran. <br/>
            Chaque jeu de données projeté aura une et une seule caractéristique parmi celle qui sont présentées ci-dessous. L’objectif de la question est d’indiquer quelle est la caractéristique du jeu de données dans RN. Chaque caractéristique, et donc réponse, sera représentée par un diagramme. Leur signification peut être rappelée si vous passez le curseur de la souris sans cliquer par-dessus le diagramme. Les <b>outliers</b> ne doivent pas être considérer pour trouver la caractéristique du jeu de données. <br/>
            Les caractéristiques possibles sont :<br/>
            1.Tous les clusters sont bien écartés les uns des autres dans RN. <img className="answer-image" src="ans/struct1.png" /><br/>
            2.Il y a au moins un cluster positionné à l’intérieur d’un autre sans se mélanger/se superposer dans RN (une sorte de "bulle").<img className="answer-image" src="ans/struct2.png" /><br/>
            3.Il y a au moins deux clusters qui se mélangent/se superposent dans RN.<img className="answer-image" src="ans/struct3.png" /><br/>
            4.Il y a au moins deux clusters sont plus proches entre eux dans RN par rapport aux autres.<img className="answer-image" src="ans/struct4.png" /><br/>
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
                Pour cette tâche, nous considèrerons qu’il y a soit 5, soit 7 clusters à chaque question, des erreurs de projections peuvent venir perturber l’interprétation de la visualisation. Les deux colorations seront proposées à l’écran.<br/>
                Pour répondre à cette question, il faut trouver le nombre d’éléments dont le label est différent de ses voisins au sein du cluster demandé, les éléments positionnés en bordure d’un cluster ne sont pas forcément à considérer comme <b>outliers</b>. Les outliers sont généralement proches des autres éléments dans RN, et donc cette distance peut être vérifiée sur la méthode de colorisation à l'écran. La réponse est à donner en utilisant le clavier à l’écran, puis en cliquant sur SUIVANT. En cas d’erreur, vous pouvez cliquer sur ANNULER pour effacer la réponse en cours.
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