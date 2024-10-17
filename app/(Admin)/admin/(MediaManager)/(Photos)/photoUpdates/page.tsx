import supabase from "@/lib/supabase"

export default async function PhotoUpgrade() {
    const { data: photoData } = await supabase.from('Photography').select(`*, fileID ( * )`).order('photoName', { ascending: true }) as any
    photoData.forEach(async (data: any) => {
        const takenDate = data.fileID.capturedOn
        const photoID = data.id
        const { status: supabaseStatus , error: supabaseError } = await supabase.from("Photography").update({ capturedOn: takenDate }).eq('id', photoID)
        // console.log(supabaseStatus, supabaseError)
    })
    return (
       <></>
    )
}
