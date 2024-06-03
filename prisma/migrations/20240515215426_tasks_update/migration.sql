-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "differentialCalculusDifficulty" INTEGER DEFAULT 0,
ADD COLUMN     "differentialEquationsDifficulty" INTEGER DEFAULT 0,
ADD COLUMN     "integralCalculusDifficulty" INTEGER DEFAULT 0,
ADD COLUMN     "limitAndContinuityDifficulty" INTEGER DEFAULT 0,
ADD COLUMN     "multivariateAnalysisDifficulty" INTEGER DEFAULT 0,
ADD COLUMN     "seriesAndSequencesDifficulty" INTEGER DEFAULT 0,
ALTER COLUMN "difficulty" SET DEFAULT 0;
