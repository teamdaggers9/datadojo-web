import React from 'react'
import store from "../store/MasterStore";

const Workforce = () => {
    const { candidates, skillSet, designations } = store((state) => state);

    const getDesignationName = id => {
        const designation = designations.find(des => des.designation_id === id)

        if (designation) return designation.designation_name
        return ""
    }

    const EmployeeCard = ({ data }) => (

        <div className="col-lg-3 col-md-6 col-12">
            <div className="team-style-default">
                <div className="inner">
                    <div className="thumbnail">
                        <img src={data.profile_pic_url} alt="Corporate Template" />
                    </div>
                    <div className="content">
                        <h2 className="title">{data.first_name} {data.last_name}</h2>
                        <h6 className="subtitle theme-gradient">{getDesignationName(data.designation_id)}</h6>
                        <span className="team-form">
                            Employee ID:<br /> DAIPL/0121/0{data.employee_id}
                        </span>
                        <span className="team-form">
                            <i className="flag"><img src={require(`../assets/images/flags/4x3/${data.country_code}.svg`)} alt="" /></i>
                            <span className="location">{data.location}</span>
                        </span>
                        <p className="description">
                            Skill Set:<br />
                            {
                                data.skill_set.map(skill => {
                                    const skillData = skillSet.find(sk => sk.skill_id === skill.skill_id)

                                    if (skillData) return " " + skillData.skill_name;
                                    else return ""
                                }).toString()
                            }

                        </p>

                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div className="containerFull">
                <h2 className="txtCenter innerTitle">Team</h2>
                <div className="row row--15">
                    {
                        candidates.map((data, ind) => (
                            <EmployeeCard
                                key={ind}
                                data={data}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Workforce