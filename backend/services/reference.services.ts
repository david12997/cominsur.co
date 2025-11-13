import { MyReferenceRepository, ReferenceRepository } from "../repositories/reference.repository";

export class ReferenceService {

    private ReferenceRepository: ReferenceRepository;

    constructor() {
        this.ReferenceRepository = MyReferenceRepository;
    }

    async getAllReferences(limit: number = -1, offset: number = 0) {
        if (!this.ReferenceRepository) throw new Error("ReferenceRepository is required");

        // call repository with provided pagination values (default: no limit)
        let refs = await this.ReferenceRepository.GetAllReferences(limit, offset);

        // transform data and media from string to json when present
        if (refs && refs.data) {
            refs.data = (refs.data as any[]).map((ref: any) => {
                if (ref.data && typeof ref.data === "string") {
                    try {
                        ref.data = JSON.parse(ref.data);
                    } catch (e) {
                        // leave as-is if parse fails
                    }
                }
                if (ref.media && typeof ref.media === "string") {
                    try {
                        ref.media = JSON.parse(ref.media);
                    } catch (e) {
                        // leave as-is
                    }
                }
                if (ref.color && typeof ref.color === "string") {
                    try {
                        ref.color = JSON.parse(ref.color);
                    } catch (e) {
                        // leave as-is
                    }
                }
                return ref;
            });
        }

        return refs;
    }

    async getReferenceById(id: number | string) {
        if (!this.ReferenceRepository) throw new Error("ReferenceRepository is required");

        let res = await this.ReferenceRepository.GetReferenceById(id);

        if (res && res.data) {
            const ref = res.data as any;
            if (ref.data && typeof ref.data === "string") {
                try {
                    ref.data = JSON.parse(ref.data);
                } catch (e) {
                    // ignore parse errors
                }
            }
            if (ref.media && typeof ref.media === "string") {
                try {
                    ref.media = JSON.parse(ref.media);
                } catch (e) {
                    // ignore
                }
            }
            res.data = ref;
        }

        return res;
    }
}

export const MyReferenceService = new ReferenceService();
