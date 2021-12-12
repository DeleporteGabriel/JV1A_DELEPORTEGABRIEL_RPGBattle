//Variable pour attaquer
var Vise = 0;
var Reviser = true;
//Variable de défense
var DefChevalier = false;
var DefRobot = false;
var DefCuisinier = false;
var DefDemon = false;
//Variable d'attaques utilisés
var AtkChevalier = 0;
var AtkRobot = 0;
var AtkCuisinier = 0;
var AtkDemon = 0;
//Variable d'avancer du jeu
var Tour = 0;
var Terminer = false;
//Obtenir tout l'écran et la boite de dialogue
var Global = document.getElementById("Screen");
var Dialogue = document.getElementById("DialogAttaque");
//Obtenir les boutons de commandes
var AttaqueSpe = document.getElementById("OptionSpe");
var Defense = document.getElementById("OptionDefense");
var Attaque = document.getElementById("OptionAttaque");
//Initialiser les textes
Dialogue.innerHTML = "C'est au grand chevalier de la lumière d'attaquer"
AttaqueSpe.innerHTML = "Fuite"
//Obtenir les sprites
var SprChevalier = document.getElementById("spr-char1");
var SprRobot = document.getElementById("spr-char2");
var SprCuisinier = document.getElementById("spr-char3");
var SprDemon = document.getElementById("spr-char4");
//Obtenir les PV
var Chevalier = document.getElementById("ValeurPV1");
var Robot = document.getElementById("ValeurPV2");
var Cuisinier = document.getElementById("ValeurPV3");
var Demon = document.getElementById("ValeurPV4");
//Obtenir les MP
var ChevalierMP = document.getElementById("ValeurMP1");
var RobotMP = document.getElementById("ValeurMP2");
var CuisinierMP = document.getElementById("ValeurMP3");
var DemonMP = document.getElementById("ValeurMP4");
//Statut en fuite
var Statu1 = document.getElementById("Statue1");
//Obtenir les PV des monstres
var Monstre01 = document.getElementById("PVmonster01");
var Monstre02 = document.getElementById("PVmonster02");
var Monstre03 = document.getElementById("PVmonster03");


Attaque.onclick = function() {if (Terminer == false) {
if (Tour < 4) {
    //Regardez si chaque personnage peut utiliser l'attaque
    if (Tour == 0) {if (AtkChevalier != 1) {
        HerosAttack();
        AtkChevalier = 1;}}
    else if (Tour == 1) {if (AtkRobot != 1) {
        HerosAttack();
        AtkRobot = 1;}}
    else if (Tour == 2) {if (AtkCuisinier != 1) {
        HerosAttack();
        AtkCuisinier = 1;}}
    else if (Tour == 3) {if (AtkDemon != 1) {
        HerosAttack();
        AtkDemon = 1;}}
}
else {
    EnnemisAttack();
    Tour += 1;
    if (Tour > 6) {
        Tour = 0;
    }

    CheckMort();
}
}}
//Attaque Special des personnages
AttaqueSpe.onclick = function() {if (Terminer == false) {
//Attaque Spé du Chevalier (fuir - équivalent du suicide, pas une bonne option)
if (Tour == 0) {if (ChevalierMP.innerHTML >= 10) {if (AtkChevalier != 3)
{
    Chevalier.innerHTML = 0;
    heros = document.getElementById("spr-char1");
    heros.style.visibility = "hidden";
    Statu1.innerHTML = "En fuite"
    ChevalierMP.innerHTML = 0;
    AtkChevalier = 3;

    Tour += 1;
   
}}}
//Attaque Spé du Robot (attaquer tous les monstres)
else if (Tour == 1) {if (RobotMP.innerHTML >= 3) {if (AtkRobot != 3)
{
    var Attaque = Math.floor(Math.random() * 3) + 2;
    //Attaquer le premier monstre
    var PVmechant = document.getElementById("PVmonster01");
    var monstre = document.getElementById("sprEnnemies1");
    PVmechant.innerHTML -= Attaque;
    if (PVmechant.innerHTML <= 0){
        PVmechant.innerHTML = 0;
        monstre.style.visibility = "hidden";
    }
    //Attaquer le deuxième monstre
    var PVmechant = document.getElementById("PVmonster02");
    var monstre = document.getElementById("sprEnnemies2");
    PVmechant.innerHTML -= Attaque;
    if (PVmechant.innerHTML <= 0){
        PVmechant.innerHTML = 0;
        monstre.style.visibility = "hidden";
    }
    //Attaquer le troisième monstre
    var PVmechant = document.getElementById("PVmonster03");
    var monstre = document.getElementById("sprEnnemies3");
    PVmechant.innerHTML -= Attaque;
    if (PVmechant.innerHTML <= 0){
        PVmechant.innerHTML = 0;
        monstre.style.visibility = "hidden";
    }
    RobotMP.innerHTML -= 3;
    AtkRobot = 3;

    Tour += 1;
    CheckMort();
}}}
//Attaque Spé du Cuisinier (se soigner)
else if (Tour == 2) {if (CuisinierMP.innerHTML >= 3){if (AtkCuisinier != 3)
{ 
    Cuisinier.innerHTML = +Cuisinier.innerHTML + 5;
    CuisinierMP.innerHTML -= 3;
    AtkCuisinier = 3;
    Tour += 1;
}}}
//Attaque Spé du Démon (récupérer les points de vie infligés à l'adversaire)
else if (Tour == 3) {if (DemonMP.innerHTML >= 5) {if (AtkDemon != 3)
{ 
    var Attaque = Math.floor(Math.random() * 3) + 4;
    //Viser quelqu'un de vivant
    var Reviser = true;
    while (Reviser == true) {
        Vise = Math.floor(Math.random()*3);
        if (Vise == 0) {if (Monstre01.innerHTML > 0) {Reviser = false;}}
        if (Vise == 1) {if (Monstre02.innerHTML > 0) {Reviser = false;}}
        if (Vise == 2) {if (Monstre03.innerHTML > 0) {Reviser = false;}}
    }
    //Prendre les variables de la personne visée
    if (Vise == 0){
        var PVmechant = document.getElementById("PVmonster01");
        var monstre = document.getElementById("sprEnnemies1");
    }
    else if (Vise == 1){
        var PVmechant = document.getElementById("PVmonster02");
        var monstre = document.getElementById("sprEnnemies2");
    }
    if (Vise == 2){
        var PVmechant = document.getElementById("PVmonster03");
        var monstre = document.getElementById("sprEnnemies3");
    }
    //Attaquer
    PVmechant.innerHTML -= Attaque;
    if (PVmechant.innerHTML <= 0){
        PVmechant.innerHTML = 0;
        monstre.style.visibility = "hidden";
    }
    Demon.innerHTML = +Demon.innerHTML + Attaque;
    DemonMP.innerHTML -= 5
    AtkDemon = 3;

    Tour += 1;
}}}
    if (Tour > 7) {
        Tour = 0;
    }
    CheckMort();
}}

//Défense des personnages
Defense.onclick = function() {if (Terminer == false) {
    //Défense du chevalier
    if (Tour == 0) { if (AtkChevalier != 2) {
        DefChevalier = true;
        AtkChevalier = 2;

        Tour += 1;
        if (Tour > 7) {
            Tour = 0;
        }
        CheckMort();
    }}
    //Défense du robot
    else if (Tour == 1) { if (AtkRobot != 2) {
        DefRobot = true;
        AtkRobot = 2;

        Tour += 1;
        if (Tour > 7) {
            Tour = 0;
        }
        CheckMort();
    }}
    //Défense du cuisinier
    else if (Tour == 2) {if (AtkCuisinier != 2) {
        DefCuisinier = true;
        AtkCuisinier = 2;

        Tour += 1;
        if (Tour > 7) {
            Tour = 0;
        }
        CheckMort();
    }}
    //Défense du démon
    else if (Tour == 3) {if (AtkDemon != 2) {
        DefDemon = true;
        AtkDemon = 2;

        Tour += 1;
        if (Tour > 7) {
            Tour = 0;
        }
        CheckMort();
    }}
}}
//Attaque des héros
function HerosAttack() {
    var Attaque = Math.floor(Math.random() * 3) + 4;
    //Viser quelqu'un de vivant
    var Reviser = true;
    while (Reviser == true) {
        Vise = Math.floor(Math.random()*3);
        if (Vise == 0) {if (Monstre01.innerHTML > 0) {Reviser = false;}}
        if (Vise == 1) {if (Monstre02.innerHTML > 0) {Reviser = false;}}
        if (Vise == 2) {if (Monstre03.innerHTML > 0) {Reviser = false;}}
    }
    //Prendre les variables de la personne visée
    if (Vise == 0){
        var PVmechant = document.getElementById("PVmonster01");
        var monstre = document.getElementById("sprEnnemies1");
    }
    else if (Vise == 1){
        var PVmechant = document.getElementById("PVmonster02");
        var monstre = document.getElementById("sprEnnemies2");
    }
    if (Vise == 2){
        var PVmechant = document.getElementById("PVmonster03");
        var monstre = document.getElementById("sprEnnemies3");
    }
    //Attaquer
    PVmechant.innerHTML -= Attaque;
    if (PVmechant.innerHTML <= 0){
        PVmechant.innerHTML = 0;
        monstre.style.visibility = "hidden";
    }

    Tour += 1;
    if (Tour > 7) {
        Tour = 0;
    }

    CheckMort();
}
//Attaque des ennemis
function EnnemisAttack() {
    var Attaque = Math.floor(Math.random() * 3) + 4;

    Dialogue.innerHTML = "L'ennemis attaque !"
    //Viser quelqu'un en vie
    Recibler = true;
    while (Recibler == true) {
        Cible = Math.floor(Math.random()*4);
        if (Cible == 0) {if (Chevalier.innerHTML > 0) {Recibler = false;}}
        if (Cible == 1) {if (Robot.innerHTML > 0) {Recibler = false;}}
        if (Cible == 2) {if (Cuisinier.innerHTML > 0) {Recibler = false;}}
        if (Cible == 3) {if (Demon.innerHTML > 0) {Recibler = false;}}
    }
    //Prendre les variables de la personne visée
    if (Cible == 0){
        var PVgentil = document.getElementById("ValeurPV1");
        var heros = document.getElementById("spr-char1");
        if (DefChevalier == true) {Attaque = 0;}
    }
    else if (Cible == 1){
        var PVgentil = document.getElementById("ValeurPV2");
        var heros = document.getElementById("spr-char2");
        if (DefRobot == true) {Attaque = 0;}
    }
    else if (Cible == 2){
        var PVgentil = document.getElementById("ValeurPV3");
        var heros = document.getElementById("spr-char3");
        if (DefCuisinier == true) {Attaque = 0;}
    }
    else {
        var PVgentil = document.getElementById("ValeurPV4");
        var heros = document.getElementById("spr-char4");
        if (DefDemon == true) {Attaque = 0;}
    }
    //Attaquer
    PVgentil.innerHTML -= Attaque;
    if (PVgentil.innerHTML <= 0){
        PVgentil.innerHTML = 0;
        heros.style.visibility = "hidden";
    }
}


function CheckMort() {
    if (Tour == 0) {
        //Reset la défense
        DefChevalier = false;
        DefRobot = false;
        DefCuisinier = false;
        DefDemon = false;
        //Check si le Chevalier est en vie
        if (Chevalier.innerHTML > 0) {
            PositionAttaque();
            SprChevalier.style.alignSelf = "flex-start";
            Dialogue.innerHTML = "C'est au grand chevalier de la lumière d'attaquer"
            Attaque.innerHTML = "Attaque"
            Defense.innerHTML = "Defense"
            AttaqueSpe.innerHTML = "Fuite"

            //Mettre en gris les capacités inutilisables
            if (AtkChevalier == 1) {
                Attaque.style.backgroundColor = "#666666"
            } else {
                Attaque.style.backgroundColor = "#000000"
            }
            if (AtkChevalier == 2) {
                Defense.style.backgroundColor = "#666666"
            } else {
                Defense.style.backgroundColor = "#000000"
            }
            if (AtkChevalier == 3) {
                AttaqueSpe.style.backgroundColor = "#666666"
            } else if (ChevalierMP.innerHTML == 0) {
                Attaque.style.backgroundColor = "#666666"
            } else {
                AttaqueSpe.style.backgroundColor = "#000000"
            }

        }
        else {Tour++}
    }
    if (Tour == 1) {
        //Check si le robot est en vie
        if (Robot.innerHTML > 0) {
            PositionAttaque();
            SprRobot.style.alignSelf = "flex-start";
            Dialogue.innerHTML = "C'est au bonhomme tout gris qui ressemble à un robot d'attaquer"
            AttaqueSpe.innerHTML = "01101111001"
            Attaque.innerHTML = "Attaque"
            Defense.innerHTML = "Defense"

            //Mettre en gris les capacités inutilisables
            if (AtkRobot == 1) {
                Attaque.style.backgroundColor = "#666666"
            } else {
                Attaque.style.backgroundColor = "#000000"
            }
            if (AtkRobot == 2) {
                Defense.style.backgroundColor = "#666666"
            } else {
                Defense.style.backgroundColor = "#000000"
            }
            if (AtkRobot == 3) {
                AttaqueSpe.style.backgroundColor = "#666666"
            } else if (RobotMP.innerHTML < 3) {
                AttaqueSpe.style.backgroundColor = "#666666"
            } else {
                AttaqueSpe.style.backgroundColor = "#000000"
            }
            
        }
        else {Tour++}
    }
    if (Tour == 2) {
        //Check si le cuisinier est en vie
        if (Cuisinier.innerHTML > 0) {
            PositionAttaque();
            SprCuisinier.style.alignSelf = "flex-start";
            Dialogue.innerHTML = "C'est au cuisinier en chef 5 étoiles d'attaquer"
            AttaqueSpe.innerHTML = "Pâtes bolognaises"
            Attaque.innerHTML = "Attaque"
            Defense.innerHTML = "Defense"

            //Mettre en gris les capacités inutilisables
            if (AtkCuisinier == 1) {
                Attaque.style.backgroundColor = "#666666"
            } else {
                Attaque.style.backgroundColor = "#000000"
            }
            if (AtkCuisinier == 2) {
                Defense.style.backgroundColor = "#666666"
            } else {
                Defense.style.backgroundColor = "#000000"
            }
            if (AtkCuisinier == 3) {
                AttaqueSpe.style.backgroundColor = "#666666"
            } else if (CuisinierMP.innerHTML < 3) {
                AttaqueSpe.style.backgroundColor = "#666666"
            } else {
                AttaqueSpe.style.backgroundColor = "#000000"
            }
        }
        else {Tour++}
    }
    if (Tour == 3) {
        //Check si le Demon est en vie
        if (Demon.innerHTML > 0) {
            PositionAttaque();
            SprDemon.style.alignSelf = "flex-start";
            Dialogue.innerHTML = "C'est au petit diablotin roublard d'attaquer"
            AttaqueSpe.innerHTML = "Voleur de vie"
            Attaque.innerHTML = "Attaque"
            Defense.innerHTML = "Defense"

            //Mettre en gris les capacités inutilisables
            if (AtkDemon == 1) {
                Attaque.style.backgroundColor = "#666666"
            } else {
                Attaque.style.backgroundColor = "#000000"
            }
            if (AtkDemon == 2) {
                Defense.style.backgroundColor = "#666666"
            } else {
                Defense.style.backgroundColor = "#000000"
            }
            if (AtkDemon == 3) {
                AttaqueSpe.style.backgroundColor = "#666666"
            } else if (DemonMP.innerHTML < 5) {
                AttaqueSpe.style.backgroundColor = "#666666"
            } else {
                AttaqueSpe.style.backgroundColor = "#000000"
            }
        }
        else {Tour++}
    }
    if (Tour >= 4) {
        PositionAttaque()
        Dialogue.innerHTML = "L'ennemis attaque !"
        //Reset la boite d'attaque
        AttaqueSpe.innerHTML = " ."
        Attaque.innerHTML = "skip"
        Defense.innerHTML = " ."
        Attaque.style.backgroundColor = "#000000"
        Defense.style.backgroundColor = "#000000"
        AttaqueSpe.style.backgroundColor = "#000000"
        //Skip les monstres morts
        if (Monstre01.innerHTML <= 0) {Tour++}
        if (Monstre02.innerHTML <= 0) {Tour++}
        if (Monstre03.innerHTML <= 0) {Tour++}
    }
    //Vérifier la défaite
    if (Chevalier.innerHTML == 0) {
        if (Robot.innerHTML == 0) {
            if (Cuisinier.innerHTML == 0) {
                if (Demon.innerHTML == 0) {
                    Dialogue.innerHTML = "Dommage, vous avez perdu";
                    AttaqueSpe.innerHTML = ""
                    Attaque.innerHTML = ""
                    Defense.innerHTML = ""
                    Terminer = true;
                }
            }
        }
    }
    //Vérifier la victoire
    if (Monstre01.innerHTML == 0) {
        if (Monstre02.innerHTML == 0) {
            if (Monstre03.innerHTML == 0) {
                Dialogue.innerHTML = "Félicitation, vous avez gagné!";
                AttaqueSpe.innerHTML = ""
                Attaque.innerHTML = ""
                Defense.innerHTML = ""
                Terminer = true;
            }
        }
    }
}
//Reset les positions des personnages
function PositionAttaque() {
    SprChevalier.style.alignSelf = "flex-end";
    SprRobot.style.alignSelf = "flex-end";
    SprCuisinier.style.alignSelf = "flex-end";
    SprDemon.style.alignSelf = "flex-end";
}