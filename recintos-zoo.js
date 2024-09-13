class RecintosZoo {

    analisaRecintos(animal, quantidade) {

        const especiesValidas = ['LEAO', 'LEOPARDO', 'CROCODILO', 'MACACO', 'GAZELA', 'HIPOPOTAMO'];
        if (!especiesValidas.includes(animal)) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: [{ especie: 'LEAO', quantidade: 1 }] },
        ];

        const biomasAnimal = {
            'LEAO': ['savana'],
            'LEOPARDO': ['savana'],
            'CROCODILO': ['rio'],
            'MACACO': ['savana', 'floresta'],
            'GAZELA': ['savana'],
            'HIPOPOTAMO': ['savana', 'rio']
        };

        const tamanhoAnimal = {
            'LEAO': 3,
            'LEOPARDO': 2,
            'CROCODILO': 3,
            'MACACO': 1,
            'GAZELA': 2,
            'HIPOPOTAMO': 4
        };

        const recintosViaveis = recintos.filter((recinto) => {

            if (!biomasAnimal[animal].includes(recinto.bioma) && !(animal === 'HIPOPOTAMO' && recinto.bioma === 'savana e rio')) {
                return false;
            }

            const espacoOcupado = recinto.animaisExistentes.reduce((acumulado, animalExistente) => {
                const tamanho = tamanhoAnimal[animalExistente.especie] * animalExistente.quantidade;
                return acumulado + tamanho + (animalExistente.especie !== animal ? 1 : 0);
            }, 0);

            const espacoNecessario = tamanhoAnimal[animal] * quantidade;

            return (recinto.tamanhoTotal - espacoOcupado) >= espacoNecessario;
        }).map((recinto) => {

            const espacoOcupado = recinto.animaisExistentes.reduce((acumulado, animalExistente) => {
                const tamanho = tamanhoAnimal[animalExistente.especie] * animalExistente.quantidade;
                return acumulado + tamanho + (animalExistente.especie !== animal ? 1 : 0);
            }, 0);

            const espacoLivre = recinto.tamanhoTotal - (espacoOcupado + tamanhoAnimal[animal] * quantidade);
            return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
        });

        if (recintosViaveis.length > 0) {
            return { recintosViaveis };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }
}

export { RecintosZoo as RecintosZoo };
