class NeyroNet {
    constructor(neyConf) {
        this.neyConf = neyConf;

        this.ney = [];
        this.w = [];
        this.error = [];

        this.cofStudy = 0.7;

        this.init();
    }

    init() {
        //ney, error
        for (var i = 0; i < this.neyConf.length; i++) {
            this.ney[i] = [];
            this.error[i] = [];
            for (var j = 0; j < this.neyConf[i] + 1; j++) {
                if (i + 1 == this.neyConf.length && j == this.neyConf[i]) {
                    break;
                }
                this.ney[i][j] = 1;
                this.error[i][j] = 1;
            }
        }

        //w
        for (var i = 0; i < this.neyConf.length - 1; i++) {
            this.w[i] = [];
            for (var j = 0; j < this.neyConf[i] + 1; j++) {
                this.w[i][j] = [];
                for (var k = 0; k < this.neyConf[i + 1]; k++) {
                    this.w[i][j][k] = Math.random();
                }
            }
        }
    }

    count(input) {
        for (var i = 0; i < input.length; i++) {
            this.ney[0][i] = input[i];
        }

        for (var i = 0; i < this.ney.length - 1; i++) {
            var con;
            if (i + 1 == this.ney.length - 1) {
                con = this.ney[i + 1].length;
            } else {
                con = this.ney[i + 1].length - 1;
            }

            for (var j = 0; j < con; j++) {
                this.ney[i + 1][j] = 0;
                for (var k = 0; k < this.ney[i].length; k++) {
                    this.ney[i + 1][j] += this.ney[i][k] * this.w[i][k][j];
                }
                this.ney[i + 1][j] = 1 / (1 + Math.exp(-1 * this.ney[i + 1][j]));
            }
        }

        return this.ney[this.ney.length - 1];
    }

    findErrorOut(output) {
        for (var i = 0; i < this.ney[this.ney.length - 1].length; i++) {
            this.error[this.ney.length - 1][i] = output[i] - this.ney[this.ney.length - 1][i];
        }
    }

    findError(output) {
        this.findErrorOut(output);
        for (var i = this.ney.length - 2; i >= 1; i--) {
            for (var j = 0; j < this.ney[i].length; j++) {
                this.error[i][j] = 0;

                var con;
                if (i == this.ney.length - 2) {
                    con = this.ney[i + 1].length;
                } else {
                    con = this.ney[i + 1].length - 1;
                }

                for (var k = 0; k < con; k++) {
                    this.error[i][j] += this.error[i + 1][k] * this.w[i][j][k];
                }
            }
        }
    }

    updateW() {
        for (var i = 0; i < this.ney.length - 1; i++) {
            for (var j = 0; j < this.ney[i].length; j++) {
                var con;
                if (i + 1 == this.ney.length - 1) {
                    con = this.ney[i + 1].length;
                } else {
                    con = this.ney[i + 1].length - 1;
                }

                for (var k = 0; k < con; k++) {
                    this.w[i][j][k] =
                        this.w[i][j][k] +
                        this.cofStudy *
                            this.error[i + 1][k] *
                            this.ney[i + 1][k] *
                            (1 - this.ney[i + 1][k]) *
                            this.ney[i][j];
                }
            }
        }
    }

    learn(val, input, output) {
        for (var i = 0; i < val; i++) {
            for (var j = 0; j < input.length; j++) {
                this.count(input[j]);
                this.findError(output[j]);
                this.updateW();
            }
        }
    }

    reset() {
        for (var i = 0; i < this.neyConf.length - 1; i++) {
            for (var j = 0; j < this.neyConf[i] + 1; j++) {
                for (var k = 0; k < this.neyConf[i + 1]; k++) {
                    this.w[i][j][k] = Math.random();
                }
            }
        }
    }

    getNey() {
        return this.ney;
    }
}
