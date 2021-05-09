function randomVal(max,min){
    return Math.floor(Math.random() * (max - min)) + min;
}

const monsterSlayer = Vue.createApp({
    data() {
        return {
            monsterHealth : 100,
            playerHealth : 100,
            round : 0,
            winner : null,
            logMessages : []
        };
    },
    computed: {
        monsterBarStyle() {
            if(this.monsterHealth < 0) {
                return { width : '0%'};
            }
            return {width: this.monsterHealth + '%'}; 
        },
        playerBarStyle() {
            if(this.playerHealth < 0) {
                return { width : '0%'};
            }
            return {width: this.playerHealth + '%'};
        },
        useSpecialAttack() {
            return this.round % 3 !== 0;
        },
    },
    watch: {
        playerHealth(value) {
            if(value <=0 && this.monsterHealth <=0) {
                this.winner = 'draw';
            } else if(value <= 0){
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if(value <=0 && this.playerHealth <=0) {
                this.winner = 'draw';
            } else if(value <= 0){
                this.winner = 'player';
            }
        },
    },
    methods: {
        startNewGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.round = 0;
            this.winner = null;
            this.logMessages = [];
        },
        attackMonster() {
            this.round++;
            const damage = randomVal(12,5);
            this.monsterHealth -= damage;
            this.addLogMessage('player', 'attack', damage);
            this.attackPlayer();
        },
        attackPlayer() {
            const damage =  randomVal(15,8);
            this.playerHealth -= damage;
            this.addLogMessage('monster', 'attack', damage);
        },
        specialAttackMonster() {
            this.round++;
            const damage = randomVal(25,10);
            this.monsterHealth -= damage;
            this.addLogMessage('player', 'attack', damage);
            this.attackPlayer();
        },
        healPlayer() {
            this.round++;
            const healValue = randomVal(20,8);
            if(this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy : who,
                actionType : what,
                actionValue : value
            });
        },
    },
    
});

monsterSlayer.mount('#game');