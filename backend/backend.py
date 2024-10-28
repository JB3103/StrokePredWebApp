from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
#from transformers import pipeline, Conversation
#from transformers import AutoTokenizer, AutoModelForCausalLM


#generator = pipeline('text-generation', model="distilbert/distilgpt2")
app = FastAPI()
'''model_name = "microsoft/DialoGPT-medium"
tokenizer = AutoTokenizer.from_pretrained(model_name, padding_side='left')
model = AutoModelForCausalLM.from_pretrained(model_name)
model.config.pad_token_id = model.config.eos_token_id
pipe = pipeline("conversational", model=model, tokenizer=tokenizer)
# Set up a custom chat template


def generate_advice(input_data, model_outputs):
    prompt = f"""Here is some health details:
    Heart disease: {input_data.heart_disease}
    Hypertension: {input_data.hypertension}
    Ever married: {input_data.ever_married}
    Gender: {input_data.gender}
    Age: {input_data.age}
    Avg glucose level: {input_data.avg_glucose_level}
    BMI: {input_data.bmi}
    Smoking status: {input_data.smoking_status}
    Work type: {input_data.work_type}, 
    Stroke risk: {model_outputs}. 
    Based of the information provided, give some general advice to avoid stroke."""

    conv = Conversation(prompt)
    response = pipe(conv)
    return response


'''
def get_stroke_advice(attributes, stroke_risk_binary):
    recommendations = []

    if stroke_risk_binary <=50:
        recommendations.append("You are currently at low risk for a stroke. Continue maintaining a healthy lifestyle.")
        recommendations.append("Exercise regularly (150 minutes of moderate activity per week).")
        recommendations.append("Eat a balanced diet rich in fruits, vegetables, and whole grains.")
        recommendations.append("Avoid smoking and limit alcohol consumption.")
        recommendations.append("Monitor your blood pressure and cholesterol levels to keep them in a healthy range.")
    
    else:
        recommendations.append("There is a risk of stroke. Please take immediate steps to reduce your risk.")
        recommendations.append("Consult with a healthcare provider for a detailed stroke prevention plan.")
        recommendations.append("If you have hypertension, work to control your blood pressure through medication or lifestyle changes.")
        recommendations.append("Quit smoking immediately if applicable.")
        recommendations.append("Engage in regular physical activity (e.g., 30 minutes of brisk walking per day).")
        recommendations.append("Maintain a heart-healthy diet (reduce saturated fats, salt, and processed foods).")
        recommendations.append("Monitor your blood sugar levels, especially if they are elevated.")
    
    # Additional recommendations based on specific user attributes
    if attributes.hypertension == 'Yes':
        recommendations.append("Since you have hypertension, regularly monitor your blood pressure and aim to keep it under control.")
    if attributes.heart_disease == 'Yes':
        recommendations.append("Due to heart disease, it’s important to work closely with a cardiologist to reduce stroke risk.")
    if attributes.smoking_status != 'never':
        recommendations.append("Quitting smoking is one of the most effective ways to lower your stroke risk.")
    if attributes.bmi >= 25:
        recommendations.append("Consider adopting a weight loss plan to achieve a healthier BMI.")
    if attributes.avg_glucose_level > 100:
        recommendations.append("Monitor blood sugar levels and consult a healthcare provider if you are at risk of diabetes.")

    return recommendations


app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models = []

for i in range(9):
    print("importing model", i)
    models.append(joblib.load(f"model{i}.pkl"))

class ModelAttributes(BaseModel):
    gender: str
    age: int
    hypertension: str
    heart_disease: str
    ever_married: str
    residence_type: str
    avg_glucose_level: float
    bmi: float
    smoking_status: str
    work_type: str


def getWorkTypeMatrix(work_type: str):
    work_type_matrix = [0, 0, 0, 0, 0]
    if work_type == "govt":
        work_type_matrix[0] = 1
    elif work_type == "never":
        work_type_matrix[1] = 1
    elif work_type == "private":
        work_type_matrix[2] = 1
    elif work_type == "self":
        work_type_matrix[3] = 1
    else:
        work_type_matrix[4] = 1
    return work_type_matrix

def getSmokingMatrix(smoking_status: str):
    smoking_matrix = [0, 0, 0]
    if smoking_status == "formerly":
        smoking_matrix[0] = 1
    elif smoking_status == "never":
        smoking_matrix[1] = 1
    else:
        smoking_matrix[2] = 1
    return smoking_matrix

@app.post("/predict")
async def predict(input_data: ModelAttributes):
    inputs = []
    temp = []
    if input_data.gender == "male":
        temp.append(1)
    else:
        temp.append(0)
    temp.append(input_data.age)
    if input_data.hypertension == "yes":
        temp.append(1)
    else:
        temp.append(0)
    if input_data.heart_disease == "yes":
        temp.append(1)
    else:
        temp.append(0)
    if input_data.ever_married == "yes":
        temp.append(1)
    else:
        temp.append(0)
    if input_data.residence_type == "urban":
        temp.append(1)
    else:
        temp.append(0)
    temp.append(input_data.avg_glucose_level)
    temp.append(input_data.bmi)

    
    temp += getSmokingMatrix(input_data.smoking_status)
    temp += getWorkTypeMatrix(input_data.work_type)
    inputs.append(temp)
    predictions = []
    for model in models:
        predictions.append(model.predict(inputs)[0])
    res = ''.join(get_stroke_advice(input_data, (predictions.count(1)/len(predictions)) * 100))
    print(generate_advice(input_data, (predictions.count(1)/len(predictions)) * 100))
    return {"message": res}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)